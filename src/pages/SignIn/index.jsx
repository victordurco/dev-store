import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PasswordInput from '../shared/PasswordInput';
import { signIn } from '../../services/devStore.services';
/* eslint react/prop-types: "off" */
/* eslint react/jsx-props-no-spreading: "off" */

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: 'glauco@gmail.com',
    password: '12345678',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setErrors({ ...errors, [prop]: '' });
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSignIn = () => {
    signIn(formData)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        const { status } = error.response;
        console.log(status);
        if (status === 404) {
          setErrors({
            ...errors,
            email: 'E-mail não cadastrado',
          });
        }
      });
  };

  return (
    <>
      <Header>
        <Logo> dev_store </Logo>
      </Header>

      <Container>
        <h1> Login do Cliente </h1>
        <Form
          component="form"
          autoComplete="on"
        >
          <TextField
            fullWidth
            error={errors.email}
            helperText={errors.email}
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            label="E-mail"
            variant="filled"
            margin="normal"
          />

          <PasswordInput
            fullWidth
            margin="normal"
            type={formData.showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            width="350px"
            label="Senha"
            variant="filled"
          />

          <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>

          <SignUpText>
            Não possui conta em nossa loja?
            <Link to="/cadastro">
              <b> Cadastre-se aqui</b>
            </Link>
          </SignUpText>

          <SignInButton
            onClick={handleSignIn}
            variant="contained"
            color="secondary"
            margin="normal"
            size="large"
          >
            Entrar
          </SignInButton>

        </Form>

      </Container>
    </>
  );
};

const Header = styled.header`
    background-color: #FA4098;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 109px;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-left: 182px;

    @media (max-width: 800px) {
       justify-content: center;
       padding-left: 0;
    }
`;

const Logo = styled.span`
    font-family: 'Quantico', sans-serif;
    color: white;
    font-size: 45px;
`;

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 147px);
    margin-top: 147px;
    color: #686868;
    display: flex;
    flex-direction: column;
    align-items: center;

    & {
      h1 {
        font-family: 'Quantico', sans-serif;
        font-weight: bold;
        font-size: 40px;
      }
    }

    @media (max-width: 600px) {
    & {
      h1 {
        font-size: 30px;
      }
    }
    }
`;

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin-top: 38px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

const ForgotPasswordText = styled.span`
  color: #9C9C9C;
  cursor: pointer;
  width: 100%;
`;

const SignUpText = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const SignInButton = styled(Button)`
  width: 350px;
  font-weight: bold !important;
`;

export default SignIn;
