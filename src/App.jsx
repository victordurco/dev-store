import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';

export default function App() {
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
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cadastro" exact element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
