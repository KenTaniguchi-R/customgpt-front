import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useRefDetailState = ({source_id, ref_id}) =>{
  const [ref, setRef] = useCustomState({
    init: {'source': '', 'target': '', 'text': ''},
    url: `${BASE_API_ENDPOINT}api/analytics/get_ref_doc/${source_id}/${ref_id}`,
  })

  return ref;
}