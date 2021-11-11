import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyle from './styles/GlobalStyle';
import HomePage from './pages/Home';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import UserContext from './contexts/UserContext';
import Header from './pages/shared/Header';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
