import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useChatInfoState = ({source_id}) =>{
  const [source, setSource] = useCustomState({
    init: {'thumbnail': '', 'name': '', 'description': ''},
    url: `${BASE_API_ENDPOINT}api/chat/get_chat/${source_id}`,
  })

  return source;
}