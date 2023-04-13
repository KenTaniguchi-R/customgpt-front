import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useShareState = ({source_id}) =>{
  const [shares, setShares] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_shares/${source_id}`,
  })

  return shares;
}