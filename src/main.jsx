import React from 'react'
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import './interceptors/axios';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { GOOGLE_CLIENT_ID } from './vars/GOOGLE';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)