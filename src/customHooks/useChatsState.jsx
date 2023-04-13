import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useChatsState = () =>{
  const [chats, setChats] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_chat_list/`
  })

  return {chats, setChats};
}