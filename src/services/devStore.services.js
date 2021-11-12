import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

const signUp = (body) => axios.post(`${URL_API}/sign-up`, body);

const getProductByCode = (code) => axios.get(`${URL_API}/products/${code}`);

export { signIn, signUp, getProductByCode };
