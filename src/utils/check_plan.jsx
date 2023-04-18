
const check_chat_num = (myPlan, chat_num) => {
  const LIMIT = {
    1: 2,
    2: 10,
    3: 10000,
    4: 10000,
  }
  return LIMIT[myPlan] > chat_num;
}

export { check_chat_num }