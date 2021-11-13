import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

const signUp = (body) => axios.post(`${URL_API}/sign-up`, body);

const getProductByCode = (code) => axios.get(`${URL_API}/products/${code}`);

const getUser = (token) => axios.get(`${URL_API}/user`, getConfig(token));

export {
  signIn, signUp, getProductByCode, getUser,
};
