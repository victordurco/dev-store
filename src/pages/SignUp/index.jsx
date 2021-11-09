import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextMaskCPF, TextMaskPhone } from '../shared/masks';

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sendSignUpForm = (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        password: 'Senhas não correspondentes',
        confirmPassword: 'Senhas não correspondentes',
      });
      return;
    }
    setErrors({
      ...errors,
      password: '',
      confirmPassword: '',
    });

    if (values.name < 3) {
      setErrors({
        ...errors,
        name: 'Nome deve conter pelo menos 3 letras',
      });
      return;
    }
    setErrors({
      ...errors,
      name: '',
    });
  };

  return (
    <Container>
      <Header>
        <Logo>
          dev_store
        </Logo>
      </Header>
      <PageTitle>Criar seu cadastro</PageTitle>
      <Form onSubmit={sendSignUpForm}>
        <TextField
          fullWidth
          error={errors.name.length > 0}
          helperText={errors.cpf}
          margin="normal"
          type="text"
          label="name"
          variant="filled"
          required
        />
        <TextField
          name="cpfmask"
          id="cpf-mask-input"
          fullWidth
          error={errors.cpf.length > 0}
          helperText={errors.cpf}
          margin="normal"
          type="text"
          label="CPF"
          variant="filled"
          value={values.cpf}
          onChange={handleChange('cpf')}
          InputProps={{
            inputComponent: TextMaskCPF,
          }}
          required
        />
        <TextField
          name="phonemask"
          id="phone-mask-input"
          fullWidth
          error={errors.phone.length > 0}
          helperText={errors.phone}
          margin="normal"
          type="text"
          label="Celular"
          variant="filled"
          value={values.phone}
          onChange={handleChange('phone')}
          InputProps={{
            inputComponent: TextMaskPhone,
          }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="email"
          error={errors.email.length > 0}
          helperText={errors.email}
          label="E-mail"
          variant="filled"
          value={values.email}
          onChange={handleChange('email')}
          required
        />
        <TextField
          fullWidth
          variant="filled"
          margin="normal"
          error={errors.password.length > 0}
          helperText={errors.password}
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {' '}

              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          margin="normal"
          error={errors.confirmPassword.length > 0}
          helperText={errors.confirmPassword}
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          label="Confirme a senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {' '}

              </InputAdornment>
            ),
          }}
        />
        <AlreadyHaveAccount onClick={() => navigate('/entrar')}>
          Já possui conta em nossa loja?
          <ClickHere>Clique Aqui</ClickHere>
        </AlreadyHaveAccount>
        <SignUpButton
          type="submit"
          variant="contained"
          color="secondary"
          margin="normal"
          size="large"
        >
          Cadastrar
        </SignUpButton>
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 109px;
  background-color: #fa4098;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px 0px #00000040;

`;

const Logo = styled.span`
    font-size: 45px;
    margin: auto 0 auto 182px;
    color: white;
    font-family: 'Quantico', sans-serif;
`;

const PageTitle = styled.span`
    font-size: 45px;
    font-family: 'Quantico', sans-serif;
    font-weight: 700;
    color: #686868;
    margin-top:35px;
`;

const Form = styled.form`
  width:450;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:15px;
  margin-bottom: 50px;

  TextField{
    margin-bottom: 15px;
  }
`;

const SignUpButton = styled(Button)`
  width: 350px;
  font-weight: bold !important;
`;

const AlreadyHaveAccount = styled.button`
  font-size: 18px;
  color: #686868;
  font-family: 'Roboto', sans-serif;
  margin: 30px 0 15px 0;
  cursor: pointer;
  background-color: white;
`;

const ClickHere = styled.span`
  font-weight: 700;
`;
