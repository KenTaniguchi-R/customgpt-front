const DEBUG = false;

let BASE_API_ENDPOINT = '';
if (DEBUG) {
  BASE_API_ENDPOINT = 'http://localhost:8000/';
}else{
  BASE_API_ENDPOINT = 'https://customgpt.herokuapp.com/';
}

export default BASE_API_ENDPOINT;