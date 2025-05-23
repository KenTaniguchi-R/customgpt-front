import { useState, createRef, useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import './App.css'
import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { CircularProgress } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Alert } from '@mui/material';

import axios from 'axios'

import Sidebar from './Sidebar'
import { OpenLink } from './components/OpenLink';
import { useChatInfoState } from './customHooks/useChatInfoState';
import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';
import useCustomReducer from './reducers/useCustomReducer';
import { useCountMessageState } from './customHooks/useCountMessageState';
import { usePlanContext } from './contexts/PlanContext';
import { check_message_num } from './utils/check_plan';


const GET_ROOM_MESSAGES_URL = `${BASE_API_ENDPOINT}api/chat/get_messages/`;


const styles = {
  answer_text: {
    whiteSpace: 'pre-wrap',
  },
  reference_text: {
    whiteSpace: 'pre-wrap',
  }
}

function Chat() {

  const [messages, setMessages] = useState([]);
  const [room_id, setRoomId] = useState(null);
  const {source} = useParams();

  const handleGetRoom = async (next_room, type, setRooms) => {
    const res = await axios.get(`${BASE_API_ENDPOINT}api/chat/get_rooms/${source}`);
    setRooms(res.data);

    if (type === "new") {
      setRoomId(null);
      setMessages([]);
      return;
    }
    try {
      const response = await axios.get(GET_ROOM_MESSAGES_URL, {
        params: {
          'room_id': next_room,
        }
      });
      setRoomId(next_room);

      let new_messages = response.data.map((message) => {
        return [{
          "id": message.id,
          "text": message.question,
          "from": 'me',
          "reference": '',
        },
        {
          "id": message.id + 'answer',
          "text": message.answer,
          "from": "them",
          "reference": message.reference,
        }
        ]
      })
      new_messages = [].concat.apply([], new_messages);
      setMessages(new_messages);
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <main className="main-container">
      <Grid container alignItems="stretch" sx={{height:'100%'}}>
        <Grid item xs={0} md={3} lg={2} className='sidebar'
          display={{ xs: "none", md: 'block' }}
        >
          <Sidebar
            has_chat_info={true}
            has_rooms={true}
            handleRoom={handleGetRoom} />
        </Grid>
        <Grid item xs={12} md={9} lg={10} sx={{height:'100%'}}>
          <MainContent
            messages={messages} setMessages={setMessages}
            room_id={room_id} setRoomId={setRoomId} />
        </Grid>
      </Grid>
    </main>
  )
}
const GET_REPLY_URL = `${BASE_API_ENDPOINT}api/chat/get_reply/`;

const MainContent = ({messages, setMessages, room_id, setRoomId}) => {

  const source_id = useParams().source;

  const [countToday, setCountToday] = useCountMessageState();
  const { myPlan } = usePlanContext();

  const [inputState, inputDispatch] = useCustomReducer();
  const messagesEndRef = createRef();

  const source = useChatInfoState({source_id: source_id});

  const handleSendMessage = async () => {
    if (!inputState.input) return;
    inputDispatch({ type: 'SUBMIT' });

    try{
      let response = await axios.post(GET_REPLY_URL, {
        'source': source.id,
        'room': room_id,
        'input': inputState.input,
        'history': messages
      })
      console.log(response.data)
      let reply_message = [
        {
          "id": messages.length + 1,
          "text": inputState.input,
          "from": "me",
          "reference": "",
        },
        {
          "id": messages.length + 2,
          "text": response.data.answer,
          "from": "them",
          "reference": response.data.reference,
        }
      ]
      setRoomId(response.data.room_id)
      setMessages([...messages, ...reply_message])
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setCountToday(countToday + 1);

      inputDispatch({ type: 'SUCCESS' });

    } catch (error) {
      inputDispatch({ type: 'ERROR' });
    }

  }

  return (
    <section className="content-container">
      <div className='chat-container'>
        <ChatList messages={messages} inputState={inputState}/>
        <div ref={messagesEndRef} />
      </div>
      <div className='input-container'>
        {

          <TextField id="outlined-basic" label="Question" variant="outlined" margin="normal" fullWidth
            value={inputState.input} onChange={(e) => inputDispatch({ type: 'INPUT', payload: e.target.value })}
            InputProps={{
              endAdornment: <InputAdornment position="end" className='send-btn' onClick={handleSendMessage} >send</InputAdornment>,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          // :
          // <Alert severity="error">1日に送れるメッセージの上限に達しました。プランをアップグレードすることで、メッセージの上限を増やすことができます。</Alert>
        }
      </div>
    </section>
  )
}

const ChatList = ({messages, inputState}) => {
  return (
    <div className='chat'>
      <ChatMessage key={-3} text="Hi, ask me anything" from="them" reference="" />
      {
        messages.map((message) => {
          return (
            <ChatMessage key={message.id} text={message.text} from={message.from} reference={message.reference} />
            )
          })
        }
      { inputState.isLoading &&
        <>
        <ChatMessage key={-2} text={inputState.input} from="me" reference="" />
        <ChatMessage key={-1} text={<CircularProgress size={20} />} from="them" reference="" />
        </>
      }
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

const ChatMessage = ({text, from, reference}) => {

  return (
    <div className={`chat-message from-${from}`}>
      <div className='chat-message__text'>
        <pre style={styles.answer_text}>{text}</pre>
        { reference &&
          <>
            <br></br>
            <Reference place={reference.target} text={reference.text} />
          </>
        }
      </div>
    </div>
  )
}

const Reference = ({place, text}) => {
  const has_link = place.includes('http');
  text = text.replace(/(\r\n|\r|\n){2,}/g, '$1\n');
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Reference: {place} <OpenLink has_link={has_link} href={place} /></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <pre style={ styles.reference_text }>
          {text}
        </pre>
      </AccordionDetails>
    </Accordion>
  )
}

export default Chat
