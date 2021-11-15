import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyle from './styles/GlobalStyle';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import UserContext from './contexts/UserContext';
import Header from './pages/shared/Header';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { getUser } from './services/devStore.services';
import Categorie from './pages/Categorie';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      getUser(token)
        .then((response) => {
          setUser({ ...response.data, token });
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FA4098',
      },
      secondary: {
        main: '#41E45B',
        contrastText: '#fff',
      },
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/entrar" exact element={<SignIn />} />
            <Route path="/cadastro" exact element={<SignUp />} />
            <Route path="/carrinho" exact element={<Cart />} />
            <Route path="/produtos/:productCode" exact element={<Products />} />
            <Route path="/categoria/:categorieId" exact element={<Categorie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
