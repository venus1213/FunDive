import { PlanType } from '@prisma/client';

export interface PlanFeatures {
  messageDisplayLimit: number;
  projectAccess: {
    create: {
      limit: number | false;
      types: string[];
    };
    view: {
      limit: boolean;
      types: string[];
    };
  };
  profileAccess: {
    sns: {
      viewable: boolean;
      userTypes: string[];
    };
    view: {
      [key: string]: boolean;
    };
  };
  messageAccess: {
    direct: {
      view: boolean;
      send: {
        [key: string]: boolean;
      };
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
      send: {
        [key: string]: boolean;
      };
    };
  };
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    messageDisplayLimit: 30,
    projectAccess: {
      create: {
        limit: 1,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: false,
        userTypes: [],
      },
      view: {
        investor: true,
        entrepreneur: true,
      },
    },
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
  },
  startup_partner: {
    messageDisplayLimit: 50,
    projectAccess: {
      create: {
        limit: 2,
        types: ['cofounder'],
      },
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        userTypes: ['entrepreneur'],
      },
      view: {
        investor: false,
        entrepreneur: true,
      },
    },
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
  },
  standard: {
    messageDisplayLimit: 100,
    projectAccess: {
      create: {
        limit: 3,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        userTypes: ['entrepreneur', 'investor'],
      },
      view: {
        investor: true,
        entrepreneur: true,
      },
    },
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
  },
  premium: {
    messageDisplayLimit: 300,
    projectAccess: {
      create: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
      view: {
        limit: false,
        types: ['entrepreneur', 'investor', 'cofounder'],
      },
    },
    profileAccess: {
      sns: {
        viewable: true,
        userTypes: ['entrepreneur', 'investor'],
      },
      view: {
        investor: true,
        entrepreneur: true,
      },
    },
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
  },
};

// プランの価格設定（円）
export const PLAN_PRICES = {
  monthly: {
    free: 0,
    startup_partner: 3000,
    standard: 5000,
    // premium: 7800,
  },
};

// プラン名の日本語表示
export const PLAN_NAMES_JA = {
  free: 'フリープラン',
  startup_partner: 'スタートアップパートナープラン',
  standard: 'スタンダードプラン',
  premium: 'プレミアムプラン',
};

// 契約期間の表示
export const BILLING_PERIODS = {
  monthly: '月額',
};

// プランの説明
export const PLAN_DESCRIPTIONS = {
  free: 'プロジェクトの閲覧とプロジェクト1件の作成が可能な無料プラン',
  startup_partner: '起業家とのマッチングに特化したスタートアップ向けプラン',
  standard: 'メッセージ機能が使い放題＆プロジェクト3件まで作成可能なスタンダードプラン',
  premium: '全ての機能が使い放題＆優先表示付きのプレミアムプラン',
}; 