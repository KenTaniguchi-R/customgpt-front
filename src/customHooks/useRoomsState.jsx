import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useRoomsState = ({source_id}) =>{
  const [rooms, setRooms] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_rooms/${source_id}`,
  })

  return {rooms, setRooms};
}