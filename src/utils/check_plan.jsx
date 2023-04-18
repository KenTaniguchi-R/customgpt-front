
const check_chat_num = (myPlan, chat_num) => {
  const LIMIT = {
    1: 2,
    2: 10,
    3: 10000,
    4: 10000,
  }
  return LIMIT[myPlan] > chat_num;
}

const get_chat_limit = (myPlan) => {
  const LIMIT = {
    1: {
      pdf: 2,
      url: 3,
      pdf_t: '最大2MBまでです。',
      url_t: '最大3個まで取得されます。',
    },
    2: {
      pdf: 5,
      url: 10,
      pdf_t: '最大5MBまでです。',
      url_t: '最大10個まで取得されます。',
    },
    3: {
      pdf: 10000,
      url: 10000,
      pdf_t: '',
      url_t: '',
    },
    4: {
      pdf: 10000,
      url: 10000,
      pdf_t: '',
      url_t: '',
    },
  }
  return LIMIT[myPlan];
}

export { check_chat_num, get_chat_limit }