import axios from "axios";

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

let count = 0;

// TODO: fix this
axios.interceptors.response.use(

  // success
  response => {
    return response
  },

  async error => {
    if (count > 10) {
      return Promise.reject(error)
    }
    const originalRequest = error.config;
    const refresh = localStorage.getItem('refresh_token');


    // if access token expired
    if (error.response.status === 401) {
      try{
        const res = await axios.post(`${BASE_API_ENDPOINT}api/token/refresh/`, {
          refresh: refresh
        })

        if (res.status === 200) {
          // update token
          localStorage.setItem('access_token', res.data.access);
          axios.defaults.headers.common['Authorization'] = 'JWT ' + res.data.access;
          originalRequest.headers['Authorization'] = 'JWT ' + res.data.access;
          return axios(originalRequest)
        }else{
          count += 1;
          localStorage.clear();
          axios.defaults.headers.common['Authorization'] = null;
          return Promise.reject(error)
        }

      }catch{
        console.log('error')
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)