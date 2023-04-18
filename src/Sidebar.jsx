import { useParams } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChatIcon from '@mui/icons-material/Chat';

import { useChatInfoState } from './customHooks/useChatInfoState';
import { useRoomsState } from './customHooks/useRoomsState';

const Sidebar = ({has_chat_info=false, has_rooms=false, handleRoom=null}) => {

  return (
      <aside>
        {has_chat_info && <ChatInfo />}

        {has_rooms &&
          <div className='rooms'>
            <RoomList handleRoom={handleRoom} />
          </div>
        }
      </aside>
  );
}

const ChatInfo = () => {
  const {source} = useParams();
  const chatInfo = useChatInfoState({source_id: source});

  const image = chatInfo.thumbnail ? chatInfo.thumbnail.thumbnail : null;

  return (
    <div className='chat-info'>
      <div style={{textAlign: 'center'}}>
        <img src={image} alt="プレビュー" width="80%" />
      </div>
      <div>
        <p>{chatInfo.name}</p>
      </div>
      <div>
        <p>{chatInfo.description}</p>
      </div>
    </div>
  )
}


const RoomList = ({handleRoom}) => {

  const {source} = useParams();
  const {rooms, setRooms} = useRoomsState({source_id: source});

  return (
    <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400,}}>
      <RoomItem room_id={-1} text='New Chat'
        type='new' handleRoom={handleRoom} setRooms={setRooms} />

      {rooms.map((room) => (
        <RoomItem key={room.id} room_id={room.id} text={room.messages}
          type='switch' handleRoom={handleRoom} setRooms={setRooms} />
      ))}
    </List>
  )
}

const RoomItem = ({room_id, text, type, handleRoom, setRooms}) => {
  return (
    <ListItem key={room_id} disablePadding width='100%' onClick={()=> handleRoom(room_id, type, setRooms)}>
      <ListItemButton>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default Sidebar;