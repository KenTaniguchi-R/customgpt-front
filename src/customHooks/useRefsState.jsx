import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useRefsState = ({source_id}) =>{
  const [ref, setRef] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/analytics/get_ref_analytics/${source_id}`,
  })

  return ref;
}