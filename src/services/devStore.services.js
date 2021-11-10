/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const URL_API = 'https://driven-dev-store.herokuapp.com/';

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

export {
  signIn,
};
