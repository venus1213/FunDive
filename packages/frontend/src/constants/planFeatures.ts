import { PlanType } from '@/types/user';

export type MessageType = 'direct' | 'project';
export type ProjectType = 'entrepreneur' | 'investor' | 'cofounder';
export type UserType = 'entrepreneur' | 'investor' | 'admin';

export const PLAN_NAMES_JA = {
  free: 'フリープラン',
  startup_partner: '創業仲間募集プラン',
  standard: 'スタンダードプラン',
  premium: 'プレミアムプラン',
} as const;

export const PLAN_DESCRIPTIONS = {
  free: 'プロジェクトの閲覧とプロジェクト1件の作成が可能な無料プラン',
  startup_partner: '起業家とのマッチングに特化したスタートアップ向けプラン',
  standard: 'メッセージ機能が使い放題＆プロジェクト3件まで作成可能なスタンダードプラン',
  premium: '全ての機能が使い放題＆優先表示付きのプレミアムプラン',
} as const;

export const PLAN_PRICES = {
  monthly: {
    free: 0,
    startup_partner: 3000,
    standard: 5000,
    // premium: 7800,
  },
} as const;

// プランの優先順位を定義
export const PLAN_PRIORITY = {
  free: 0,
  startup_partner: 1,
  standard: 2,
  premium: 3,
} as const;

export type PlanPriority = keyof typeof PLAN_PRIORITY;

export type PlanFeatureKey = 
  | "messageDisplayLimit"
  | "messageAccess"
  | "projectAccess"
  | "profileAccess"
  | "projectAccess.create"
  | "projectAccess.view"
  | "projectAccess.create.limit"
  | "projectAccess.create.types"
  | "projectAccess.view.limit"
  | "projectAccess.view.types";

export const PLAN_FEATURES: Record<PlanType, {
  messageDisplayLimit: number;
  messageAccess: {
    direct: {
      view: boolean;
      send: Record<string, boolean>;
    };
    project: {
      view: {
        own: boolean;
        others: {
          entrepreneur: boolean;
          investor: boolean;
          cofounder: boolean;
        };
      };
      send: Record<string, boolean>;
    };
  };
  projectAccess: {
    view: {
      limit: boolean;
      types: string[];
    };
    create: {
      limit: number | false;
      types: string[];
    };
  };
  profileAccess: {
    sns: {
      viewable: boolean;
      editable: boolean;
      userTypes: string[];
    };
    view: Record<string, boolean>;
  };
}> = {
  free: {
    messageDisplayLimit: 30,
    messageAccess: {
      direct: {
        view: true,
        send: {
          entrepreneur: false,
          investor: false,
        },
      },
      project: {
        view: {
          own: true,
          others: {
            entrepreneur: true,
            investor: false,
            cofounder: true
          }
        },
        send: {
          entrepreneur: false,
          investor: false,
          cofounder: false,
        },
      },
    },
    projectAccess: {
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      create: {
        limit: 1,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: false,
        editable: false,
        userTypes: [],
      },
      view: {
        entrepreneur: true,
        investor: true,
      },
    },
  },
  startup_partner: {
    messageDisplayLimit: 50,
    messageAccess: {
      direct: {
        view: true,
        send: {
          entrepreneur: true,
          investor: false,
        },
      },
      project: {
        view: {
          own: true,
          others: {
            entrepreneur: true,
            investor: false,
            cofounder: true
          }
        },
        send: {
          entrepreneur: true,
          investor: false,
          cofounder: true,
        },
      },
    },
    projectAccess: {
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      create: {
        limit: 2,
        types: ['cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        editable: true,
        userTypes: ['entrepreneur'],
      },
      view: {
        entrepreneur: true,
        investor: true,
      },
    },
  },
  standard: {
    messageDisplayLimit: 100,
    messageAccess: {
      direct: {
        view: true,
        send: {
          entrepreneur: true,
          investor: true,
          cofounder: true,
        },
      },
      project: {
        view: {
          own: true,
          others: {
            entrepreneur: true,
            investor: true,
            cofounder: true
          }
        },
        send: {
          entrepreneur: true,
          investor: true,
          cofounder: true,
        },
      },
    },
    projectAccess: {
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      create: {
        limit: 3,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        editable: true,
        userTypes: ['entrepreneur', 'investor'],
      },
      view: {
        entrepreneur: true,
        investor: true,
      },
    },
  },
  premium: {
    messageDisplayLimit: 300,
    messageAccess: {
      direct: {
        view: true,
        send: {
          entrepreneur: true,
          investor: true,
          cofounder: true,
        },
      },
      project: {
        view: {
          own: true,
          others: {
            entrepreneur: true,
            investor: true,
            cofounder: true
          }
        },
        send: {
          entrepreneur: true,
          investor: true,
          cofounder: true,
        },
      },
    },
    projectAccess: {
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      create: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        editable: true,
        userTypes: ['entrepreneur', 'investor'],
      },
      view: {
        entrepreneur: true,
        investor: true,
      },
    },
  },
}; 