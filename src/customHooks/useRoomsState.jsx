import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useRoomsState = ({source_id}) =>{
  const [rooms, setRooms] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/chat/get_rooms/${source_id}`,
  })

  return rooms;
}