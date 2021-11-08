import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/sign-up" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
