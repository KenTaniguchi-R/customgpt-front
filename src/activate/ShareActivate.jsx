import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { redirect_to_home } from '../utils/utils';
import { useAuthContext } from '../contexts/AuthContext';
import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

const ShareActivate = () => {

  const navigate = useNavigate();
  const { IsAuth } = useAuthContext();

  const params = useParams();
  const activation_token = params.activation_token;
  const [state, setState] = useState({'text': 'Adding', 'sub': 'Hold on...ß'});

  useEffect(() => {
    const res = axios.get(`${BASE_API_ENDPOINT}api/chat/share/${activation_token}/activation/`);
    res.then((res) => {
      if (res.status === 200){
        setState({'text': 'A chat has been added', 'sub': 'Redirecting...'});

        setTimeout(() => {
          redirect_to_home(navigate, res.data.is_toC);
        }, 3000);
      }else{
        setState({'text': '招待されたメールアドレスでログインしてください。', 'sub': ''});
      }
    }).catch((err) => {
        setState({'text': '招待されたメールアドレスでログインしてください。', 'sub': ''});
      }
    );
  }, []);

  return (

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop="10vh"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <div className="waiting">
          <h1>{state.text}</h1>
          <p>{state.sub}</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default ShareActivate;