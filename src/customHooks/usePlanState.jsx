import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const usePlanState = () =>{
  const [plan, setPlan] = useCustomState({
    init: 1,
    url: `${BASE_API_ENDPOINT}api/account/my_plan/`,
  })

  return [plan, setPlan];
}