import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import MyBreadcrumbs from '../components/MyBreadcrumbs';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

const ChangePassword = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[1].value !== e.target[2].value){
      alert('新しいパスワードが一致しません。')
      return
    }
    const data = {
      old_password: e.target[0].value,
      new_password: e.target[1].value,
      new_password2: e.target[2].value,
    }

    try{
      let res = await axios.put(`${BASE_API_ENDPOINT}api/change_password/`, data);
      if (res.status === 200){
        navigate('/my-account')
      }else{
        alert('現在のパスワードが間違っています。')
      }
    }catch{
      alert('エラーが発生しました。')
    }
  }

  return (
    <div className='main-container__form'>
      <MyBreadcrumbs routes={['ホーム', 'マイアカウント']} current='パスワードの更新' />

      <h1>パスワードの更新</h1>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

        <div className='field-container'>

          <div className='form-field'>
            <TextField
              required
              id="old-password"
              name="old-password"
              label="古いパスワード"
              type="password"
              autoComplete="old-password"
              variant="standard"
              fullWidth
              />
          </div>

          <div className='form-field'>
            <TextField
              required
              id="password"
              name="new-password"
              label="新しいパスワード"
              type="password"
              autoComplete="password"
              variant="standard"
              fullWidth
              />
          </div>

          <div className='form-field'>
            <TextField
              required
              id="password2"
              name="new-password2"
              label="新しいパスワード(再度入力)"
              type="password"
              autoComplete="password2"
              variant="standard"
              fullWidth
              />
          </div>

          <div className='form-field'>
            <Button variant="contained" type='submit' sx={{ mt: 3, mb: 2 }}>更新</Button>
          </div>

        </div>
      </Box>
    </div>
  )
}

export default ChangePassword;