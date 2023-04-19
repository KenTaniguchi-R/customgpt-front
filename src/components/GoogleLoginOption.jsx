import * as React from 'react';
import Box from '@mui/material/Box';

import axios from 'axios';

import { useAuthContext } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

const GoogleLoginOption = () => {

  const {setIsAuth, setHasPermC} = useAuthContext();

  const handleLogin = async (credentialResponse) => {
    const res = await axios.post(`${BASE_API_ENDPOINT}api/login_with_google/`, {
      credentialResponse: credentialResponse,
      is_company: window.location.href.includes("client")
    });
    let data = res.data;

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('access_token');

    setIsAuth(true);
    setHasPermC(data.is_toC);
  }

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <GoogleLogin
        text='Googleでログイン'
        width='400'
        useOneTap
        locale='ja_JP'
        cancel_on_tap_outside
        onSuccess={handleLogin}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </Box>
  )

}

export default GoogleLoginOption;