import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from 'axios';

import { useAuthContext } from './contexts/AuthContext';
import { redirect } from "react-router-dom";


export default function LogIn() {

  const {setIsAuth, setHasPermC} = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    }
    let data = await axios.post('http://localhost:8000/api/token/', user);
    data = data.data;

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('access_token');

    setIsAuth(true);
    setHasPermC(data.is_toC);

    if (data.is_toC){
      redirect('/home');
    }else{
      console.log("redirecting to client home")
      redirect('/client/home');
    }
  };

  const from_C = !window.location.href.includes("client");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> {
          from_C ? "ログイン" : "企業様用ログイン"
        } </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}