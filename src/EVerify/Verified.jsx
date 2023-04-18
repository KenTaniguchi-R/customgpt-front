import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { redirect_to_home } from '../utils/utils';
import { useAuthContext } from '../contexts/AuthContext';
import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

const Verified = () => {

  const navigate = useNavigate();
  const { setIsAuth, setHasPermC } = useAuthContext();

  const params = useParams();
  const activation_token = params.activation_token;
  const [state, setState] = useState({'text': '認証中です。', 'sub': 'しばらくお待ちください。'});

  useEffect(() => {
    const res = axios.get(`${BASE_API_ENDPOINT}api/user/${activation_token}/activation/`);
    res.then((res) => {
      if (res.status === 200){
        setState({'text': '認証に成功しました。', 'sub': '3秒後にホームページに移動します。'});

        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        setIsAuth(true);
        setHasPermC(res.data.is_toC);

        setTimeout(() => {
          redirect_to_home(navigate, res.data.is_toC);
        }, 3000);
      }else{
        setState({'text': '認証に失敗しました。', 'sub': 'もう一度登録をお願いします。'});
      }
    }
      ).catch((err) => {
        setState({'text': '認証に失敗しました。', 'sub': 'もう一度登録をお願いします。'});
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

export default Verified;