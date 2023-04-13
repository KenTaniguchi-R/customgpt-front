import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useShareState = ({source_id}) =>{
  const [shares, setShares] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_shares/${source_id}`,
  })

  return shares;
}