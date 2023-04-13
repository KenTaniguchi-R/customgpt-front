import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useShareCodeState = ({source_id}) =>{
  const [code, setCode] = useCustomState({
    init: {'code': '', 'is_public': false},
    url: `${BASE_API_ENDPOINT}api/chat/get_share_code/${source_id}`
  })

  return {code, setCode};
}