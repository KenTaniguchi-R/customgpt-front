import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useChatInfoState = ({source_id}) =>{
  const [source, setSource] = useCustomState({
    init: {'thumbnail': '', 'name': '', 'description': ''},
    url: `${BASE_API_ENDPOINT}api/chat/get_chat/${source_id}`,
  })

  return source;
}