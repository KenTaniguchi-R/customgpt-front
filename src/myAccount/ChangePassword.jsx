import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyBreadcrumbs from '../components/MyBreadcrumbs';



const ChangePassword = () => {

  const navigate = useNavigate();

  return (
    <div className='main-container__form'>
      <MyBreadcrumbs routes={['ホーム', 'マイアカウント']} current='パスワードの更新' />

      <h1>パスワードの更新</h1>
      <form onSubmit={()=> {}}>
        <div className='field-container'>
          <div className='form-field'>
            <p>ソースの修正はできません。</p>
          </div>

          <div className='form-field'>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword;