import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChatsState } from '../customHooks/useChatsState';
import useCustomReducer from '../reducers/useCustomReducer';

import { usePlanContext } from '../contexts/PlanContext';
import { check_chat_num } from '../utils/check_plan';
import axios from 'axios';

const UserHomeView = () => {

  const {chats} = useChatsState();

  const mineCount = useRef(0);

  useEffect(() => {
    let count = 0;
    chats.forEach((chat) => {
      if (chat.mine) count++;
    });
    mineCount.current = count;
  }, [chats])

  return (
    <Grid container id="chat_list" spacing={2} padding={3} alignItems="stretch">
      <Grid item xs={12} sm={6} md={4} lg={3} maxWidth="md">
        <CreateCard mineCount={mineCount} />
      </Grid>
      {chats.map((chat) => (
        <Grid item xs={12} sm={6} md={4} lg={3}  key={chat.id} maxWidth="md" >
          <ChatCard key={chat.id} {...chat} />
        </Grid>
      ))}
    </Grid>
  )
}

const CreateCard = ({mineCount}) => {
  const navigate = useNavigate();

  const { myPlan } = usePlanContext();
  const [open, setOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [InputState, InputStateDispatch] = useCustomReducer();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    InputStateDispatch({type: 'RESET'});
    setCodeInput('');
  };

  const handleCreateChat = () => {
    if (check_chat_num(myPlan, mineCount.current)){
      navigate('/new-chat/');
    }else{
      alert('チャットの作成数が上限に達しています。');
    }
  }

  const handleAddChat = async (e) => {
    if (codeInput === '') return;

    InputStateDispatch({type: 'RESET'});
    InputStateDispatch({type: 'SUBMIT'});
    e.preventDefault();

    try{
      const res = await axios.post(`${BASE_API_ENDPOINT}api/chat/add_chat/`,{
        share_code: codeInput
      });
      navigate(`/chat/${res.data.id}/`);
    }catch{
      InputStateDispatch({type: 'ERROR'});
    }
  }
  return (
    <>
    <Card className='chat-list__card'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          新規追加
        </Typography>
        <Typography variant="body2" color="text.secondary">
          自作のチャットの作成、または既存のチャットに参加できます。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleCreateChat}>作成</Button>
        <Button size="small" onClick={handleClickOpen}>追加</Button>
      </CardActions>
    </Card>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>チャットの追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            与えられたコードをここに入力してください。チャットが見つかれば追加されます。
          </DialogContentText>
          <TextField
            {...(InputState.isError && {error: true, helperText: '見つかりませんでした'})}
            autoFocus
            margin="dense"
            id="chat_code_field"
            label="チャットコード"
            type="text"
            fullWidth
            variant="standard"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleAddChat}>
            {
              InputState.isLoading ? <CircularProgress size={20} /> : '追加'
            }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const ChatCard = ({id, name, thumbnail, description, mine}) => {

  const image = thumbnail ? thumbnail.thumbnail : null;

  return (
    <Card className='chat-list__card'>
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
          variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`../../chat/${id}` }><Button size="small">チャット</Button></Link>
        { mine &&
          <Link to={`../edit-chat/${id}` } relative='path'><Button size="small">設定</Button></Link>
        }
      </CardActions>
    </Card>
  )
}

export default UserHomeView