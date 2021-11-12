import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

const signUp = (body) => axios.post(`${URL_API}/sign-up`, body);

export { signIn, signUp };
