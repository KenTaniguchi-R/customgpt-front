import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useChatsState = () =>{
  const [chats, setChats] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_chat_list/`
  })

  return {chats, setChats};
}