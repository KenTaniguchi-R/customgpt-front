import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}


export const AuthProvider = ({ children }) => {

  let auth = false;
  let permC = false;

  if (localStorage.getItem('access_token') !== null) {
    auth = true;
    axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.getItem('access_token');
    permC = parseJwt(localStorage.getItem('access_token')).is_toC;
  }

  console.log('permC: ', permC)

  const [isAuth, setIsAuth] = useState(auth);
  const [hasPermC, setHasPermC] = useState(permC);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, hasPermC, setHasPermC }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);