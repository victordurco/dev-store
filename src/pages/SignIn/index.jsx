import React, { useState, useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordInput from '../shared/PasswordInput';
import { signIn } from '../../services/devStore.services';
import UserContext from '../../contexts/UserContext';

/* eslint react/prop-types: "off" */
/* eslint react/jsx-props-no-spreading: "off" */
/* eslint jsx-a11y/anchor-is-valid: "off" */

const SignIn = () => {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const navigate = useNavigate();
  const next = useQuery().get('next');
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setErrors({ ...errors, [prop]: '' });
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signIn(formData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify({
          ...response.data,
        }));

        setUser(JSON.parse(localStorage.getItem('user')));

        if (next) {
          navigate(next);
        } else {
          navigate('/home');
        }

        setIsLoading(false);
      }).catch((error) => {
        const { status } = error.response;
        if (status === 404) {
          setErrors({
            email: 'E-mail não cadastrado',
          });
        } else if (status === 401) {
          setErrors({
            ...errors,
            password: 'Senha incorreta',
          });
        } else if (status === 400) {
          setErrors({
            ...errors,
            general: 'Dados preenchidos incorretamente',
          });
        } else {
          setErrors({
            general: 'Falha ao entrar, tente novamente mais tarde',
          });
        }
        setIsLoading(false);
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
          id="myform"
          autoComplete="on"
          onSubmit={handleSignIn}
        >
          {errors.general && (
            <HelperText>
              {errors.general}
            </HelperText>
          )}

          <TextField
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
            type="email"
            value={formData.email}
            InputLabelProps={{ required: false }}
            onChange={handleChange('email')}
            label="E-mail"
            variant="filled"
            margin="normal"
            required
          />

          <PasswordInput
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputLabelProps={{ required: false }}
            margin="normal"
            inputProps={{ minLength: 6 }}
            value={formData.password}
            onChange={handleChange('password')}
            width="350px"
            label="Senha"
            variant="filled"
            required
          />

          <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>

          <SignUpText>
            Não possui conta em nossa loja?
            <RouterLink to="/cadastro">
              <Link>
                <b> Cadastre-se aqui</b>
              </Link>
            </RouterLink>
          </SignUpText>

          <SignInButton
            loading={isLoading}
            variant="contained"
            color="secondary"
            margin="normal"
            size="large"
            type="submit"
            form="myform"
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

const HelperText = styled.span`
  font-size: 16px;
  color: #f44336;
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

const Form = styled.form`
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

const SignInButton = styled(LoadingButton)`
  width: 350px;
  font-weight: bold !important;
`;

export default SignIn;
