const user_plans = [
  {
    title: 'Free',
    description: 'お試し用',
    price: '$0.00',
    features: ['企業チャット利用無料', '個人チャット2つまで', 'メッセージ上限 10回/日', 'PDFファイル上限 2MB', '読み取りURL上限 3つ'],
  },
  {
    title: 'Starter',
    description: '個人ライトユーザー向け',
    price: '未定',
    features: ['企業チャット利用無料', '個人チャット10個まで', 'メッセージ上限 100回/日', 'PDFファイル上限 5MB', '読み取りURL上限 10個'],
  },
  {
    title: 'Pro',
    description: '個人利用の最高峰',
    price: '未定',
    features: ['企業チャット利用無料', '個人チャット無制限', 'メッセージ上限 1000回/日', 'PDFファイル上限 5MB', '読み取りURL上限 100個'],
  },
];

const client_plans = [
  {
    title: 'Enterprise',
    description: '企業向け',
    price: '未定',
    features: ['利用ユーザーの使用負担なし', 'チャット解析機能', 'PDFファイル上限 5MB', '読み取りURL上限 1000個'],
  },
]

const plans = [...user_plans, ...client_plans]

export { user_plans, client_plans, plans }