import { PrismaClient, PlanType } from '@prisma/client';
import dotenv from 'dotenv';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const prisma = new PrismaClient();

// 日本語の姓名リスト
const japaneseLastNames = [
  '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤',
  '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水',
  '山崎', '阿部', '森', '池田', '橋本', '石川', '前田', '藤田', '後藤', '小川',
  '岡田', '村上', '長谷川', '近藤', '石井', '斉藤', '坂本', '遠藤', '藤井', '青木',
  '福田', '三浦', '西村', '藤原', '太田', '松田', '原田', '岡本', '中野', '中川'
];

// 日本語の名前リスト（半分はアルファベット表記）
const japaneseFirstNames = [
  // 日本語表記
  '大翔', '蓮', '陽翔', '樹', '悠真', '湊', '陽太', '悠人', '悠斗', '大和',
  '陽菜', '葵', '凛', '陽葵', '紬', '澪', '芽依', '楓', '美月', '心春',
  '翔太', '拓海', '健太', '翔', '大輝', '海斗', '颯太', '亮太', '大樹', '健',
  // アルファベット表記
  'Haruto', 'Yuto', 'Sota', 'Yuma', 'Ren', 'Haru', 'Riku', 'Hinata', 'Aoi', 'Yui',
  'Akari', 'Ichika', 'Sakura', 'Mio', 'Yuna', 'Sora', 'Koharu', 'Rin', 'Yuka', 'Mei',
  'Takumi', 'Kenta', 'Yusei', 'Kazuki', 'Ryota', 'Daiki', 'Koki', 'Yusuke', 'Shota', 'Kaito'
];

// 英語のニックネームリスト
const englishNicknames = [
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Jamie', 'Quinn', 'Avery',
  'Charlie', 'Skyler', 'Peyton', 'Reese', 'Dakota', 'Hayden', 'Finley', 'Rowan', 'River', 'Emery',
  'Phoenix', 'Harley', 'Kai', 'Sage', 'Blake', 'Parker', 'Remy', 'Drew', 'Jaden', 'Nico',
  'Max', 'Ash', 'Frankie', 'Kendall', 'Shawn', 'Robin', 'Jessie', 'Elliot', 'Rory', 'Marley'
];

// 都道府県リスト
const prefectures = [
  '北海道', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県',
  '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '福岡県', '長崎県',
  '熊本県', '沖縄県'
];

// 起業家向け自己紹介テンプレート
const entrepreneurBioTemplates = [
  '{{prefecture}}出身のスタートアップ創業者です。{{industry}}業界で革新的なサービスを展開しています。',
  '{{industry}}分野で{{years}}年の経験があります。{{prefecture}}を拠点に新しいビジネスに挑戦中です。',
  '{{prefecture}}在住。{{industry}}のプロフェッショナルとして、持続可能なビジネスモデルを追求しています。',
  '{{industry}}業界で起業しました。{{prefecture}}から全国展開を目指しています。',
  '{{years}}年間{{industry}}業界で働いた経験を活かし、新しいサービスを開発中です。{{prefecture}}在住。',
  '{{prefecture}}出身、{{industry}}専門の起業家です。革新的なアイデアでビジネスを展開しています。',
  '{{industry}}分野でのスタートアップを{{prefecture}}で立ち上げました。新しい価値の創造に取り組んでいます。',
  '{{prefecture}}を拠点に{{industry}}関連のビジネスを展開中。{{years}}年の経験を活かしています。',
  '{{industry}}のエキスパートとして{{years}}年間活動。現在は{{prefecture}}でスタートアップを経営しています。',
  '{{prefecture}}生まれ。{{industry}}業界に革命を起こすべく日々奮闘中です。'
];

// 投資家向け自己紹介テンプレート
const investorBioTemplates = [
  '{{prefecture}}在住の投資家です。主に{{industry}}業界のスタートアップに投資しています。',
  '{{years}}年間のベンチャー投資経験があります。{{industry}}分野に特に関心があります。{{prefecture}}在住。',
  '{{prefecture}}を拠点に活動する投資家です。{{industry}}関連のスタートアップを積極的に支援しています。',
  '{{industry}}業界に特化した投資を行っています。{{prefecture}}出身、{{years}}年の投資経験があります。',
  '{{prefecture}}在住。{{industry}}分野の革新的なスタートアップへの投資に情熱を注いでいます。',
  '{{years}}年間の{{industry}}業界経験を持つエンジェル投資家です。{{prefecture}}を拠点に活動しています。',
  '{{prefecture}}出身の投資家。主に{{industry}}分野のアーリーステージスタートアップに投資しています。',
  '{{industry}}業界に特化したベンチャーキャピタリストです。{{prefecture}}在住、{{years}}年の経験があります。',
  '{{prefecture}}を拠点に、革新的な{{industry}}スタートアップへの投資を行っています。',
  '{{years}}年間の投資経験を持つ{{prefecture}}在住の投資家です。{{industry}}分野に強い関心があります。'
];

// 業界リスト
const industries = [
  'IT', 'AI', 'フィンテック', 'ヘルスケア', 'エドテック', 'eコマース', 'SaaS', 'IoT',
  'ブロックチェーン', '再生可能エネルギー', 'バイオテック', '食品', '不動産', '小売',
  'モビリティ', 'エンターテイメント', 'メディア', '製造', '農業', '観光'
];

// スキルリスト
const skillsList = {
  IT: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API'],
  AI: ['機械学習', 'ディープラーニング', 'TensorFlow', 'PyTorch', '自然言語処理', 'コンピュータビジョン', 'データ分析', 'データサイエンス'],
  フィンテック: ['ブロックチェーン', '暗号通貨', '決済システム', 'リスク管理', '金融分析', 'セキュリティ', 'コンプライアンス'],
  ヘルスケア: ['医療情報システム', '遠隔医療', '健康管理', '医療データ分析', 'バイオインフォマティクス', '臨床研究'],
  エドテック: ['オンライン教育', 'LMS開発', 'コンテンツ制作', '教育分析', 'アダプティブラーニング', 'ゲーミフィケーション'],
  eコマース: ['ECサイト構築', 'マーケティング', 'CRM', 'サプライチェーン管理', '在庫管理', 'UI/UXデザイン'],
  SaaS: ['クラウドアーキテクチャ', 'マイクロサービス', 'API設計', 'サブスクリプションモデル', 'カスタマーサクセス'],
  IoT: ['センサー技術', 'エッジコンピューティング', 'デバイス管理', 'データ収集', 'リアルタイム分析'],
  ブロックチェーン: ['スマートコントラクト', 'DeFi', 'NFT', 'Web3', '分散型アプリケーション', 'コンセンサスアルゴリズム'],
  '再生可能エネルギー': ['太陽光発電', '風力発電', 'エネルギー効率化', 'スマートグリッド', '持続可能性分析'],
  バイオテック: ['遺伝子工学', '分子生物学', 'バイオインフォマティクス', '創薬', '臨床試験'],
  食品: ['食品安全', 'サプライチェーン', '持続可能な農業', '食品加工', '栄養分析'],
  不動産: ['不動産評価', 'プロパティマネジメント', '不動産投資', '都市計画', '建築設計'],
  小売: ['在庫管理', 'POS', 'カスタマーエクスペリエンス', 'オムニチャネル', 'マーチャンダイジング'],
  モビリティ: ['自動運転', '電気自動車', 'シェアリングエコノミー', '交通最適化', '都市モビリティ'],
  エンターテイメント: ['コンテンツ制作', 'ゲーム開発', 'ストリーミング', 'バーチャルリアリティ', 'オーディオ技術'],
  メディア: ['コンテンツ戦略', 'デジタルパブリッシング', 'ソーシャルメディア', 'オーディエンス分析', 'マルチメディア制作'],
  製造: ['生産管理', '品質管理', 'サプライチェーン最適化', '自動化', '3Dプリンティング'],
  農業: ['精密農業', '持続可能な農業', '農業テクノロジー', '作物管理', '水資源管理'],
  観光: ['旅行計画', '観光マーケティング', 'ホスピタリティ管理', '観光体験設計', '地域振興']
};

// 共通スキル
const commonSkills = [
  'リーダーシップ', 'プロジェクト管理', 'チームビルディング', '戦略的思考', 'プレゼンテーション',
  'コミュニケーション', '問題解決', '交渉', 'マーケティング', '財務分析',
  'ビジネス開発', '営業', 'パートナーシップ構築', '資金調達', '事業計画'
];

// 興味関心リスト
const interestsList = [
  'テクノロジー革新', '持続可能性', 'スタートアップエコシステム', 'デジタルトランスフォーメーション',
  'イノベーション', '社会起業', 'グローバルビジネス', 'リモートワーク', 'ワークライフバランス',
  '人工知能', 'ロボティクス', '宇宙技術', '気候変動対策', '循環経済', 'スマートシティ',
  'デジタルヘルス', '教育改革', 'フードテック', 'クリーンエネルギー', 'サイバーセキュリティ',
  '量子コンピューティング', 'バイオテクノロジー', 'ナノテクノロジー', '拡張現実', '仮想現実',
  'ブロックチェーン技術', 'クラウドコンピューティング', 'ビッグデータ', 'IoT', '5G技術',
  '自動運転', 'ドローン技術', 'ウェアラブルテクノロジー', '3Dプリンティング', 'スマートホーム',
  'デジタルマーケティング', 'コンテンツ制作', 'ユーザーエクスペリエンス', 'デザイン思考', 'アジャイル開発',
  '言語学習', '文化交流', '旅行', '料理', '音楽', '芸術', '読書', 'スポーツ', 'アウトドア活動', 'ヨガ'
];

// プロジェクトタイトルテンプレート
const projectTitleTemplates = [
  '{{industry}}向け{{solution}}サービスの開発',
  '次世代{{industry}}{{solution}}プラットフォーム',
  '{{industry}}業界の{{problem}}を解決する{{solution}}',
  '{{solution}}で{{industry}}の未来を変える',
  'AI駆動型{{industry}}{{solution}}システム',
  '持続可能な{{industry}}のための{{solution}}',
  '{{industry}}向け革新的{{solution}}アプリ',
  '{{solution}}による{{industry}}のデジタル変革',
  '{{industry}}{{problem}}解決プロジェクト',
  '{{industry}}特化型{{solution}}サービス'
];

// プロジェクト説明テンプレート
const projectDescriptionTemplates = [
  '{{industry}}業界における{{problem}}は多くの企業や個人にとって大きな課題となっています。私たちは{{solution}}を活用して、この問題を効率的に解決するサービスを開発しています。{{prefecture}}を拠点に、全国展開を目指しています。',
  
  '現在の{{industry}}市場では{{problem}}が大きな障壁となっています。当プロジェクトでは、最新の{{technology}}技術を用いた{{solution}}を提供することで、この問題を解決し、業界に革命をもたらします。{{prefecture}}から始まり、グローバル展開を視野に入れています。',
  
  '{{industry}}分野における{{problem}}は、多くのステークホルダーに影響を与えています。私たちの{{solution}}は、{{technology}}を活用して、より効率的で持続可能なアプローチを提供します。{{prefecture}}の地域特性を活かした展開を計画しています。',
  
  '{{industry}}業界は急速に変化していますが、{{problem}}という課題が残されています。当プロジェクトは{{technology}}を基盤とした{{solution}}を通じて、この問題に取り組みます。{{prefecture}}の企業や個人と協力し、新しい価値を創造します。',
  
  '{{industry}}における{{problem}}は、多くの機会損失を引き起こしています。私たちは{{solution}}を通じて、この状況を改善し、業界全体の効率と生産性を向上させることを目指しています。{{prefecture}}を起点に、日本全国へサービスを展開する予定です。'
];

// プロジェクト問題リスト
const projectProblems = [
  '情報の非対称性', 'コスト高', '非効率なプロセス', 'アクセシビリティの欠如', 'データ管理の課題',
  '人材不足', '技術的障壁', '市場の分断', '品質管理の問題', 'スケーラビリティの制約',
  '持続可能性の課題', 'セキュリティリスク', '規制対応の複雑さ', 'ユーザー体験の不足', 'コミュニケーションの断絶',
  '意思決定の遅延', 'リソース配分の非効率', '競争激化', '顧客獲得コストの上昇', '技術の陳腐化'
];

// プロジェクトソリューションリスト
const projectSolutions = [
  'クラウドベース', 'AIを活用した', 'ブロックチェーン', 'IoT', 'モバイルファースト',
  'サブスクリプション型', 'マーケットプレイス', 'SaaS', 'データ分析', 'オムニチャネル',
  'パーソナライズド', 'オンデマンド', 'コラボレーション', 'クラウドソーシング', 'ハイブリッド',
  'オープンソース', 'エコフレンドリー', 'ワンストップ', 'クロスプラットフォーム', 'リアルタイム'
];

// プロジェクト技術リスト
const projectTechnologies = [
  '機械学習', 'ディープラーニング', 'クラウドコンピューティング', 'ビッグデータ分析', 'エッジコンピューティング',
  '分散型台帳技術', 'マイクロサービスアーキテクチャ', 'コンテナ化', 'サーバーレスコンピューティング', 'APIファースト',
  '自然言語処理', 'コンピュータビジョン', '拡張現実', '仮想現実', '量子コンピューティング',
  '5G', 'IoT', 'ロボティクス', '3Dプリンティング', 'バイオテクノロジー'
];

// プロジェクトステータスリスト
const projectStatuses = [
  'draft', 'active', 'suspended'
] as const;

// プロジェクトタイプリスト
const projectTypes = [
  'entrepreneur', 'investor', 'cofounder'
] as const;

// プロジェクトカテゴリリスト
const projectCategories = [
  'tech', 'finance', 'retail', 'healthcare', 'education', 'other'
] as const;

// プロジェクトステージリスト
const projectStages = [
  'idea', 'mvp', 'early_stage', 'growth', 'mature'
] as const;

type ProjectStatus = typeof projectStatuses[number];
type ProjectType = typeof projectTypes[number];
type ProjectCategory = typeof projectCategories[number];
type ProjectStage = typeof projectStages[number];

// プロジェクトタグリスト
const projectTags = [
  'スタートアップ', 'イノベーション', 'テクノロジー', '持続可能性', 'デジタルトランスフォーメーション',
  'AI', 'ブロックチェーン', 'IoT', 'モバイル', 'クラウド',
  'SaaS', 'マーケットプレイス', 'プラットフォーム', 'アプリ', 'ウェブサービス',
  'B2B', 'B2C', 'D2C', 'ソーシャルインパクト', 'グリーンテック',
  'フィンテック', 'ヘルスケア', 'エドテック', 'リテールテック', 'プロップテック',
  'アグリテック', 'フードテック', 'モビリティ', 'エンターテイメント', 'スマートシティ'
];

// Firebase Adminの初期化関数
function initAdmin() {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Required Firebase Admin environment variables are not set');
    }

    const serviceAccount = {
      projectId,
      clientEmail,
      privateKey,
    };

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

// カスタムロガー
const logger = {
  info: (...args: unknown[]) => console.log('[INFO]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};

interface BulkUserOptions {
  count: number;
  role: 'entrepreneur' | 'investor';
  isVerified: boolean;
  passwordPrefix?: string;
  emailDomain?: string;
  useJapaneseNames?: boolean;
}

// ランダムな日本語名を生成する関数
function generateJapaneseName(): { fullName: string; lastName: string; firstName: string } {
  const lastName = japaneseLastNames[Math.floor(Math.random() * japaneseLastNames.length)];
  const firstName = japaneseFirstNames[Math.floor(Math.random() * japaneseFirstNames.length)];
  return {
    fullName: `${lastName} ${firstName}`,
    lastName,
    firstName
  };
}

// ランダムな英語のニックネームを生成する関数
function generateEnglishNickname(): string {
  return englishNicknames[Math.floor(Math.random() * englishNicknames.length)];
}

// ランダムな配列要素を取得する関数
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ランダムなスキルを生成する関数
function generateSkills(industry: string): string[] {
  // 業界固有のスキルから3-5個選択
  const industrySpecificSkills = skillsList[industry as keyof typeof skillsList] || [];
  const selectedIndustrySkills = getRandomItems(industrySpecificSkills, Math.floor(Math.random() * 3) + 3);
  
  // 共通スキルから2-4個選択
  const selectedCommonSkills = getRandomItems(commonSkills, Math.floor(Math.random() * 3) + 2);
  
  // スキルを結合して返す
  return [...selectedIndustrySkills, ...selectedCommonSkills];
}

// ランダムな興味関心を生成する関数
function generateInterests(): string[] {
  // 興味関心リストから5-8個選択
  return getRandomItems(interestsList, Math.floor(Math.random() * 4) + 5);
}

// ランダムな自己紹介を生成する関数
function generateBio(role: 'entrepreneur' | 'investor'): { bio: string; location: string; industry: string; skills: string[]; interests: string[] } {
  const prefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
  const industry = industries[Math.floor(Math.random() * industries.length)];
  const years = Math.floor(Math.random() * 15) + 1; // 1-15年の経験

  let template;
  if (role === 'entrepreneur') {
    template = entrepreneurBioTemplates[Math.floor(Math.random() * entrepreneurBioTemplates.length)];
  } else {
    template = investorBioTemplates[Math.floor(Math.random() * investorBioTemplates.length)];
  }

  const bio = template
    .replace('{{prefecture}}', prefecture)
    .replace('{{industry}}', industry)
    .replace('{{years}}', years.toString());

  // スキルと興味関心を生成
  const skills = generateSkills(industry);
  const interests = generateInterests();

  return { bio, location: prefecture, industry, skills, interests };
}

// ランダムなプロジェクトを生成する関数
function generateProject(userId: string, industry: string, location: string, planType: PlanType, userRole: 'entrepreneur' | 'investor'): {
  title: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  projectType: ProjectType;
  projectStage?: ProjectStage;
  location: string;
  investmentAmount?: number;
} {
  // プロジェクトのタイトルと説明を生成
  const titleTemplates = [
    `${industry}の革新的なソリューション`,
    `次世代${industry}プラットフォーム`,
    `${industry}を変革するアプリ`,
    `${industry}のためのAIソリューション`,
    `持続可能な${industry}サービス`
  ];
  
  const descriptionTemplates = [
    `${industry}業界における課題を解決する革新的なプロジェクトです。`,
    `${industry}の効率を大幅に向上させる次世代ソリューションを開発しています。`,
    `${industry}におけるユーザー体験を根本から変えるサービスです。`,
    `AIと${industry}を組み合わせた画期的なプラットフォームです。`,
    `${industry}の持続可能な未来を創造するプロジェクトです。`
  ];
  
  const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const description = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  
  // ステータスは常にactiveに設定
  const status = 'active';
  
  // カテゴリは業界に基づいて設定
  let category: ProjectCategory;
  switch (industry) {
    case 'IT':
    case 'AI':
    case 'SaaS':
    case 'IoT':
      category = 'tech';
      break;
    case 'フィンテック':
      category = 'finance';
      break;
    case '小売':
      category = 'retail';
      break;
    case 'ヘルスケア':
      category = 'healthcare';
      break;
    case 'エドテック':
      category = 'education';
      break;
    default:
      category = 'other';
  }
  
  // プロジェクトタイプを生成
  // 投資家ユーザーの場合は常に'investor'に設定
  // 起業家ユーザーの場合は70%の確率で'entrepreneur'、30%の確率で'cofounder'に設定
  let projectType: ProjectType;
  if (userRole === 'investor') {
    projectType = 'investor';
  } else {
    projectType = Math.random() > 0.3 ? 'entrepreneur' : 'cofounder';
  }
  
  // プロジェクトステージを生成
  const projectStage = projectStages[Math.floor(Math.random() * projectStages.length)];
  
  // 投資額を生成（50%の確率で設定）
  // 対数分布を使用して、少額の目標金額がより多く出現するようにする
  // 100万円から2億円の範囲で設定
  let investmentAmount: number | undefined;
  if (Math.random() > 0.5) {
    // 対数分布を使用して、少額の方が出やすくする
    // 1から10の間の値を生成し、それを指数関数で変換
    const logValue = Math.random() * 3 + 1; // 1から4の間の値
    const expValue = Math.exp(logValue); // e^1 から e^4 の間の値
    
    // 100万円から2億円の範囲にスケーリング
    const minAmount = 1000000; // 100万円
    const maxAmount = 200000000; // 2億円
    
    // expValueを0から1の範囲に正規化し、目標範囲にスケーリング
    const normalizedValue = (expValue - Math.exp(1)) / (Math.exp(4) - Math.exp(1));
    investmentAmount = Math.round(minAmount + normalizedValue * (maxAmount - minAmount));
    
    // 金額の単位を調整
    // 1000万円までは100万円単位、それ以上は500万円単位
    if (investmentAmount <= 10000000) {
      // 100万円単位に切り捨て
      investmentAmount = Math.floor(investmentAmount / 1000000) * 1000000;
      // 最低でも100万円になるように
      if (investmentAmount < 1000000) investmentAmount = 1000000;
    } else {
      // 500万円単位に切り捨て
      investmentAmount = Math.floor(investmentAmount / 5000000) * 5000000;
    }
  } else {
    investmentAmount = undefined;
  }
  
  return {
    title,
    description,
    status,
    category,
    projectType,
    projectStage,
    location,
    investmentAmount
  };
}

async function createBulkUsers(options: BulkUserOptions) {
  const {
    count,
    role,
    isVerified,
    passwordPrefix = 'Password123!',
    emailDomain = 'example.com',
    useJapaneseNames = true
  } = options;

  try {
    // Firebase Adminの初期化
    initAdmin();
    const auth = getAuth();

    logger.info(`${count}人のユーザーを作成します（ロール: ${role}, 認証済み: ${isVerified}, 日本語名: ${useJapaneseNames}）`);

    const createdUsers = [];

    for (let i = 0; i < count; i++) {
      const uniqueId = uuidv4().substring(0, 8);
      let name, displayName;
      
      if (useJapaneseNames) {
        const japaneseName = generateJapaneseName();
        // システム内部で使用する名前はフルネーム
        name = japaneseName.fullName;
        // 表示名は名前だけ（ニックネームっぽく）
        displayName = japaneseName.firstName;
      } else {
        // 英語名の場合はニックネームを使用
        const nickname = generateEnglishNickname();
        name = `${nickname} ${uniqueId.substring(0, 4)}`;
        displayName = nickname;
      }
      
      const email = `test-${role}-${uniqueId}@${emailDomain}`;
      const password = `${passwordPrefix}${uniqueId}`;
      
      // 自己紹介、場所、スキル、興味関心を生成
      const { bio, location, industry, skills, interests } = generateBio(role);

      try {
        // Firebaseでユーザーを作成
        const firebaseUser = await auth.createUser({
          email,
          password,
          emailVerified: isVerified,
          displayName: displayName, // Firebaseの表示名もニックネームに
        });

        // カスタムクレームを設定
        await auth.setCustomUserClaims(firebaseUser.uid, { role });

        // データベースにユーザーを作成
        const user = await prisma.user.create({
          data: {
            email,
            name,
            role,
            isVerified,
            firebaseUid: firebaseUser.uid,
            profile: {
              create: {
                name,
                displayName, // 表示名を明示的に設定
                bio, // 自己紹介を設定
                location, // 場所（都道府県）を設定
                skills, // スキルを設定
                interests, // 興味関心を設定
                is_public: true,
                visible_fields: ['bio', 'company', 'position', 'location', 'website', 'social_links', 'skills', 'interests'],
              }
            }
          },
          include: {
            profile: true
          }
        });

        // プロジェクトを作成（プランに基づく制限あり）
        const projects = [];
        // 全てのユーザーにプロジェクトを作成（起業家だけでなく投資家も）
        // プランに基づくプロジェクト作成制限
        const projectLimit = {
          free: 1,
          startup_partner: 2,
          standard: 3,
          premium: 5
        }[user.planType] || 1; // デフォルトは1
        
        // 制限内でランダムな数のプロジェクトを作成
        const projectCount = Math.floor(Math.random() * projectLimit) + 1; // 1〜制限数のプロジェクト
        
        for (let j = 0; j < projectCount; j++) {
          const projectData = generateProject(user.id, industry, location, user.planType, role);
          
          const project = await prisma.project.create({
            data: {
              userId: user.id,
              title: projectData.title,
              description: projectData.description,
              status: projectData.status,
              category: projectData.category,
              projectType: projectData.projectType,
              projectStage: projectData.projectStage,
              location: projectData.location,
              investmentAmount: projectData.investmentAmount,
              popularityScore: Math.random() * 100, // 人気スコアをランダムに設定
            }
          });
          
          // 投資目標金額をログに出力
          console.log(`プロジェクト作成: ${project.title}, 投資目標金額: ${project.investmentAmount ? project.investmentAmount.toLocaleString() + '円' : '未設定'}`);
          
          projects.push(project);
        }

        // アクティビティログの記録
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            actionType: 'create',
            targetType: 'user',
            targetId: user.id,
            details: {
              action: 'bulk_user_creation',
              email: user.email,
              name: user.name,
              displayName: displayName, // ログにも表示名を記録
              role: user.role,
              bio, // 自己紹介もログに記録
              location, // 場所もログに記録
              industry, // 業界もログに記録
              skills, // スキルもログに記録
              interests, // 興味関心もログに記録
              projectCount: projects.length, // プロジェクト数もログに記録
            },
          },
        });

        createdUsers.push({
          id: user.id,
          email,
          password,
          name,
          displayName, // 作成ユーザーリストにも表示名を追加
          bio, // 自己紹介も追加
          location, // 場所も追加
          industry, // 業界も追加
          skills, // スキルも追加
          interests, // 興味関心も追加
          projectCount: projects.length, // プロジェクト数も追加
          firebaseUid: user.firebaseUid
        });

        logger.info(`ユーザーを作成しました (${i + 1}/${count}):`, {
          email,
          name,
          displayName, // ログにも表示名を出力
          bio: bio.substring(0, 30) + (bio.length > 30 ? '...' : ''), // 自己紹介の一部を出力
          location, // 場所も出力
          industry, // 業界も出力
          skills: skills.length > 0 ? `${skills.length}個のスキル` : 'なし', // スキル数を出力
          interests: interests.length > 0 ? `${interests.length}個の興味関心` : 'なし', // 興味関心数を出力
          projectCount: projects.length, // プロジェクト数も出力
          id: user.id,
          firebaseUid: user.firebaseUid
        });
      } catch (error) {
        logger.error(`ユーザー作成に失敗しました (${i + 1}/${count}):`, { email, error });
      }
    }

    // 作成したユーザーの情報をCSVフォーマットでログに出力
    logger.info('作成したユーザー一覧:');
    logger.info('email,password,name,displayName,location,industry,projectCount,id,firebaseUid');
    createdUsers.forEach(user => {
      logger.info(`${user.email},${user.password},${user.name},${user.displayName},${user.location},${user.industry},${user.projectCount},${user.id},${user.firebaseUid}`);
    });

    logger.info(`${createdUsers.length}人のユーザーを作成しました`);
    return createdUsers;
  } catch (error) {
    logger.error('バルクユーザー作成に失敗しました:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// コマンドライン引数からオプションを取得
const args = process.argv.slice(2);
const count = parseInt(args[0] || '10', 10);
const role = (args[1] || 'entrepreneur') as 'entrepreneur' | 'investor';
const isVerified = args[2] !== 'false';
const useJapaneseNames = args[3] !== 'false';

// 実行
createBulkUsers({ count, role, isVerified, useJapaneseNames })
  .then(() => {
    logger.info('バルクユーザー作成が完了しました');
    process.exit(0);
  })
  .catch(error => {
    logger.error('バルクユーザー作成中にエラーが発生しました:', error);
    process.exit(1);
  }); 