import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>
        Oops!
      </h1>
      <span>
        Não encontramos o que você estava procurando.
      </span>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/')}
      >
        <b> Ir para home </b>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & {
    h1 {
      font-size: 80px;
    }

    span {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
  }
`;

export default NotFound;
