import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate, Link } from 'react-router-dom';

import { useChatsState } from '../customHooks/useChatsState';


const ClientHomeView = () => {

  const {chats} = useChatsState();

  return (
    <Grid container id="chat_list" spacing={2} padding={3} alignItems="stretch">
      <Grid item xs={12} sm={4} md={4} lg={4} maxWidth="md">
        <CreateCard />
      </Grid>
      {chats.map((chat) => (
        <Grid item xs={12} sm={4} md={4} lg={4}  key={chat.id} maxWidth="md" >
          <ChatCard key={chat.id} chat_id={chat.id} name={chat.name} thumbnail={chat.thumbnail} description={chat.description}/>
        </Grid>
      ))}
    </Grid>
  )
}

const CreateCard = () => {
  const navigate = useNavigate();
  return (
    <Card className='chat-list__card'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* 新規作成 */}
          New Chat
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create New Chat with your own source.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('/client/new-chat/')}>Start</Button>
      </CardActions>
    </Card>
  )
}

const ChatCard = ({chat_id, name, thumbnail, description}) => {

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
        <Link to={`../edit-chat/${chat_id}` } relative='path'><Button size="small">Setting</Button></Link>
        <Link to={`../share/${chat_id}` } relative="path"><Button size="small">Share</Button></Link>
        <Link to={`../../chat/${chat_id}` }><Button size="small">Chat</Button></Link>
        <Link to={`../analysis/${chat_id}` } relative="path"><Button size="small">Analytics</Button></Link>
      </CardActions>
    </Card>
  )
}

export default ClientHomeView