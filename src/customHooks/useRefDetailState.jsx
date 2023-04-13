import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useRefDetailState = ({source_id, ref_id}) =>{
  const [ref, setRef] = useCustomState({
    init: {'source': '', 'target': '', 'text': ''},
    url: `${BASE_API_ENDPOINT}api/analytics/get_ref_doc/${source_id}/${ref_id}`,
  })

  return ref;
}