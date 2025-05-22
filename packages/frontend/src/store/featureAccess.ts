import { create } from 'zustand';
import { getInvitationStatus, validateInvitationCode, applyInvitationCode } from '@/lib/api/invitation';
import { planApi } from '@/lib/api/plan';
import { PLAN_FEATURES } from '@/constants/planFeatures';
import { PlanType, Role } from '@/types/user';
import { useAuthStore } from './auth';

// 機能制限のパラメータ型
export interface FeatureParams {
  currentValue?: number;
  type?: 'direct' | 'project';
  action?: 'view' | 'send' | 'create';
  targetUserType?: string;
}

// プラン機能の基本型定義
type PlanFeatures = typeof PLAN_FEATURES[PlanType];

interface InvitationStatus {
  isValid: boolean;
  isAdmin: boolean;
  planType?: PlanType;
  role?: Role;
  invitationExpires?: string;
}

type FeatureKey = 
  | 'messageDisplayLimit'
  | 'messageAccess.direct.view'
  | 'messageAccess.direct.send'
  | 'messageAccess.project.view'
  | 'messageAccess.project.send'
  | 'projectAccess.create'
  | 'projectAccess.view'
  | 'profileAccess.sns.viewable'
  | 'profileAccess.sns.editable'
  | 'profileAccess.view';

interface FeatureAccessState {
  // 状態
  isLoading: boolean;
  error: string | null;
  status: InvitationStatus | null;

  // 機能制限関連
  getPlanFeatures: () => PlanFeatures;
  canUseFeature: (feature: FeatureKey, params?: FeatureParams) => boolean;
  
  // 招待コード関連
  fetchStatus: () => Promise<void>;
  validateCode: (code: string) => Promise<boolean>;
  applyCode: (code: string) => Promise<boolean>;
}

// ネストされたオブジェクトからプロパティを取得する
function getNestedProperty(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// 複雑な機能制限のチェック
function checkComplexFeature(
  feature: string,
  value: any,
  params?: FeatureParams
): boolean {
  if (!value) return false;

  // params が不要なケースもあるため、デフォルト値を設定
  const safeParams = params || {} as FeatureParams;

  const parts = feature.split('.');
  const featureType = parts[0];
  const subFeature = parts[1];

  switch (featureType) {
    case 'messageAccess':
      // 例: feature = "messageAccess.direct.send" → value は { entrepreneur: true, investor: false }
      if (feature.endsWith('.send')) {
        const targetRole = safeParams.targetUserType as string | undefined;
        if (!targetRole) return false;
        return value[targetRole] ?? false;
      }
      // view 判定など単純ブールの場合は呼び出し元で処理済み
      return false;

    case 'projectAccess':
      if (!value || typeof value !== 'object') return false;

      if (subFeature === 'create' && safeParams.currentValue !== undefined) {
        if (!value.create || typeof value.create !== 'object') return false;
        const limit = value.create?.limit;
        return limit === false || (typeof limit === 'number' && safeParams.currentValue < limit);
      }
      if (subFeature === 'view') {
        return value.view?.limit ?? false;
      }
      return false;

    default:
      return false;
  }
}

export const useFeatureAccess = create<FeatureAccessState>((set, get) => ({
  // 初期状態
  isLoading: false,
  error: null,
  status: null,

  // 機能制限関連のメソッド
  getPlanFeatures: () => {
    const status = get().status;
    if (!status) return PLAN_FEATURES.free;

    // ユーザーの役割（ロール）を取得
    const userRole = status.role || useAuthStore.getState().user?.role;

    // 管理者、招待ユーザー、または投資家ユーザーは常にプレミアム扱い
    if (status.isAdmin || status.isValid || userRole === 'investor') {
      return PLAN_FEATURES.premium;
    }

    // planType が取得できていればそれを使用
    if (status.planType) {
      return PLAN_FEATURES[status.planType];
    }

    return PLAN_FEATURES.free;
  },

  canUseFeature: (feature, params) => {
    try {
      const status = get().status;
      const userRole = status?.role || useAuthStore.getState().user?.role;
      
      // バックエンドと同じロジック：isValid || isAdmin || role === 'investor'
      if (status?.isValid || status?.isAdmin || userRole === 'investor') {
        return true;
      }

      const features = get().getPlanFeatures();
      if (!features) {
        console.error('プラン機能の取得に失敗しました');
        return false;
      }

      const featureValue = getNestedProperty(features, feature);
      if (featureValue === undefined) {
        console.error(`機能が見つかりません: ${feature}`);
        return false;
      }

      // 数値制限のチェック（例：メッセージ表示制限）
      if (typeof featureValue === 'number' && params?.currentValue !== undefined) {
        return params.currentValue < featureValue;
      }

      // ブーリアン制限のチェック
      if (typeof featureValue === 'boolean') {
        return featureValue;
      }

      // オブジェクト制限のチェック（例：messageAccess, projectAccess）
      if (typeof featureValue === 'object' && featureValue !== null) {
        return checkComplexFeature(feature, featureValue, params);
      }

      return false;
    } catch (error) {
      console.error('機能制限チェック中にエラーが発生しました:', error);
      return false;
    }
  },

  // 招待コード関連のメソッド
  fetchStatus: async () => {
    set({ isLoading: true });
    try {
      const [invitationStatus, planLimits] = await Promise.all([
        getInvitationStatus(),
        planApi.getPlanLimits().catch(() => null) // 失敗しても invitationStatus は返す
      ]);

      const mergedStatus: InvitationStatus = {
        ...invitationStatus,
        planType: planLimits?.planType,
        role: planLimits?.role
      };

      set({ status: mergedStatus, error: null });
    } catch (error) {
      console.error('Status Fetch Error:', error);
      set({ error: "ステータスの取得に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  validateCode: async (code: string) => {
    set({ isLoading: true });
    try {
      const result = await validateInvitationCode(code);
      set({ error: null });
      return result.valid;
    } catch (error) {
      set({ error: "招待コードの検証に失敗しました" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  applyCode: async (code: string) => {
    set({ isLoading: true });
    try {
      await applyInvitationCode(code);
      await get().fetchStatus();
      set({ error: null });
      return true;
    } catch (error) {
      set({ error: "招待コードの利用に失敗しました" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
})); 