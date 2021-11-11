import axios from 'axios';

const URL_API = 'https://driven-dev-store.herokuapp.com';

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

const signUp = (body) => axios.post(`${URL_API}/sign-up`, body);

export { signIn, signUp };
