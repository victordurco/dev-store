import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextMaskCPF, TextMaskPhone } from '../shared/masks';

const SignUp = () => {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Header>
        <Logo>
          dev_store
        </Logo>
      </Header>
      <PageTitle>Criar seu cadastro</PageTitle>
      <Form onSubmit={registerUser}>
        <TextField
          fullWidth
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
          margin="normal"
          type="text"
          label="CPF"
          variant="filled"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          InputProps={{
            inputComponent: TextMaskCPF,
          }}
          required
        />
        <TextField
          name="phonemask"
          id="phone-mask-input"
          fullWidth
          margin="normal"
          type="text"
          label="Celular"
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            inputComponent: TextMaskPhone,
          }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="email"
          label="E-mail"
          variant="filled"
          required
        />
        <TextField
          fullWidth
          variant="filled"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => (!state))}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirme a senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword((state) => (!state))}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {' '}

              </InputAdornment>
            ),
          }}
        />
        <AlreadyHaveAccount onClick={() => alert('manda pra login')}>
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
