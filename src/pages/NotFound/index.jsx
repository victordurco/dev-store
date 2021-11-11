import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../shared/Container';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container marginTop={150}>
      <Title>
        Oops!
      </Title>
      <Message>
        Não encontramos o que você estava procurando
      </Message>
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

const Title = styled.h1`
  font-size: 80px;
`;

const Message = styled.span`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export default NotFound;
