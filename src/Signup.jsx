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
import CircularProgress from '@mui/material/CircularProgress';

import { useAuthContext } from './contexts/AuthContext';
import useCustomReducer from './reducers/useCustomReducer';
import GoogleLoginOption from './components/GoogleLoginOption';

import axios from 'axios';

import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {

  const {setIsAuth, setHasPermC} = useAuthContext();
  const [signupState, signupDispatch] = useCustomReducer();
  const from_C = !window.location.href.includes("client");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    signupDispatch({ type: 'SUBMIT' });
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data.append('is_company', !from_C);

    try{
      let res = await axios.post(`${BASE_API_ENDPOINT}api/register/`, data);

      if (res.status === 201 ){
        navigate('/signup/done');
      }else{
        // Store the login info in local storage
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        setIsAuth(true);
        setHasPermC(res.data.is_toC);
        signupDispatch({ type: 'SUCCESS' });
      }
    }catch{
      signupDispatch({ type: 'ERROR' });
      setTimeout(() => {
        signupDispatch({ type: 'RESET' });
      }, 1000);
      alert("登録に失敗しました。");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {
            from_C ? '新規登録' : '企業様用 新規登録'
          }
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {
            signupState.isLoading ?
            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled>
              <CircularProgress size={20} />
            </Button>:
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          }
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="./login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <GoogleLoginOption />
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}