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

const addProductToCart = (code, token) => axios.post(`${URL_API}/cart`, { code }, getConfig(token));

const getCart = (token) => axios.get(`${URL_API}/cart`, getConfig(token));

const deleteProduct = (code, token) => axios.delete(`${URL_API}/cart/${code}`, getConfig(token));

const getProductsHighlights = () => axios.get(`${URL_API}/highlights`);

const getProductsOnSale = () => axios.get(`${URL_API}/on-sale`);

const getCategories = () => axios.get(`${URL_API}/categories`);

const getCategorieProducts = (id) => axios.get(`${URL_API}/categorie/${id}`);

export {
  signIn,
  signUp,
  getProductByCode,
  getUser,
  getProductsHighlights,
  getProductsOnSale,
  getCategories,
  getCategorieProducts,
  addProductToCart,
  getCart,
  deleteProduct,
};
