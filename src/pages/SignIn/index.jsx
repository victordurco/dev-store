import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '../shared/Container';
import PasswordInput from '../shared/PasswordInput';
import { signIn } from '../../services/devStore.services';
import UserContext from '../../contexts/UserContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  function useQuery() {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const next = useQuery().get('next');

  const { setUser, user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      if (next) {
        navigate(next);
      } else {
        navigate('/');
      }
    }
  }, []);

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
        localStorage.setItem('token', JSON.stringify(response.data.token));
        setUser({ ...response.data });

        if (next) {
          navigate(next);
        } else {
          navigate('/');
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

  const to = (path) => {
    navigate(path);
  };

  return (
    <>
      <Container>
        <Title> Login do Cliente </Title>
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

          <SignUpContainer>
            <SignUpText>
              Não possui conta em nossa loja?
            </SignUpText>
            <SignUpButton onClick={() => to(`/cadastro${search}`)}>
              <SignUpButtonText> Cadastre-se aqui </SignUpButtonText>
            </SignUpButton>
          </SignUpContainer>

          <SignInButton
            loading={isLoading}
            variant="contained"
            color="secondary"
            margin="normal"
            size="large"
            type="submit"
            form="myform"
          >
            <strong> Entrar </strong>
          </SignInButton>
        </Form>
      </Container>
    </>
  );
};

const HelperText = styled.span`
  font-size: 16px;
  color: #f44336;
`;

const Title = styled.h1`
  font-family: 'Quantico', sans-serif;
  font-weight: bold;
  font-size: 40px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-top: 38px;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    width: 90vw;
  }
`;

const ForgotPasswordText = styled.span`
  color: #9C9C9C;
  cursor: pointer;
  width: 100%;
`;

const SignUpText = styled.span`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const SignInButton = styled(LoadingButton)`
  width: 100%;
  max-width: 350px;
`;

const SignUpButton = styled(Button)`
  width: fit-content;
`;

const SignUpButtonText = styled.span`
  text-decoration: underline;
  font-weight: bold;
`;

const SignUpContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SignIn;
