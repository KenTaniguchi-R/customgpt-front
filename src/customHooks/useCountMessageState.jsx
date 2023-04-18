import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useCountMessageState = () =>{
  const [count, setCount] = useCustomState({
    init: 0,
    url: `${BASE_API_ENDPOINT}api/validate/comment_count/`,
  })

  return [count, setCount];
}