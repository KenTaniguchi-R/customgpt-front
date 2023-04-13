import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useRefsState = ({source_id}) =>{
  const [ref, setRef] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/analytics/get_ref_analytics/${source_id}`,
  })

  return ref;
}