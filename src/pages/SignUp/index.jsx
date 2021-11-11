import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import { TextMaskCPF, TextMaskPhone, TextMaskCEP } from '../shared/masks';
import { signUp } from '../../services/devStore.services.js';

const SignUp = () => {
  const navigate = useNavigate();
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const next = useQuery().get('next');
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    cep: '',
    complement: '',
    photo: '',
    state: 0,
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
    address: '',
    cep: '',
    complement: '',
    photo: '',
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

  const resetInputErrors = () => {
    setErrors({
      name: '',
      phone: '',
      cpf: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      cep: '',
      complement: '',
      photo: '',
    });
  };

  const sendSignUpForm = (event) => {
    event.preventDefault();
    resetInputErrors();
    setIsLoading(true);
    const formData = {
      name: values.name,
      phone: values.phone,
      cpf: values.cpf,
      email: values.email,
      password: values.password,
      address: values.address,
      cep: values.cep,
      complement: values.complement,
      photo: values.photo,
      state: values.state,
    };

    if (values.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Nome deve conter pelo menos 3 letras',
      });
      setIsLoading(false);
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        password: 'Senhas não correspondentes',
        confirmPassword: 'Senhas não correspondentes',
      });
      setIsLoading(false);
      return;
    }

    signUp(formData)
      .then(() => {
        setIsLoading(false);
        if (next) {
          navigate(next);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const { status } = error.response;
        if (status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha os dados corretamente',
          });
          return;
        }

        if (status === 409) {
          setErrors({
            ...errors,
            email: 'E-mail ou CPF ja cadastrados',
            cpf: 'E-mail ou CPF ja cadastrado',
          });
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado com o cadastro',
        });
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
          helperText={errors.name}
          margin="normal"
          type="text"
          label="Nome"
          variant="filled"
          value={values.name}
          onChange={handleChange('name')}
          required
          autoComplete="on"
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
          autoComplete="on"
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
          autoComplete="on"
        />
        <TextField
          fullWidth
          error={errors.address.length > 0}
          helperText={errors.address}
          margin="normal"
          type="text"
          label="Endereço"
          variant="filled"
          value={values.address}
          onChange={handleChange('address')}
          required
          autoComplete="on"
        />
        <TextField
          fullWidth
          error={errors.complement.length > 0}
          helperText={errors.complement}
          margin="normal"
          type="text"
          label="Complemento"
          variant="filled"
          value={values.complement}
          onChange={handleChange('complement')}
          autoComplete="on"
        />
        <TextField
          name="cepmask"
          id="cep-mask-input"
          fullWidth
          error={errors.cep.length > 0}
          helperText={errors.cep}
          margin="normal"
          type="text"
          label="CEP"
          variant="filled"
          value={values.cep}
          onChange={handleChange('cep')}
          autoComplete="on"
          InputProps={{
            inputComponent: TextMaskCEP,
          }}
          required
        />
        <FormControl sx={{ m: 1, minWidth: '100%' }}>
          <InputLabel id="states-label">Estado</InputLabel>
          <Select
            labelId="states-label"
            value={values.state}
            onChange={handleChange('state')}
            label="Estado"
          >
            <MenuItem value={0}>Estados</MenuItem>
            <MenuItem value={1}>Acre</MenuItem>
            <MenuItem value={2}>Alagoas</MenuItem>
            <MenuItem value={3}>Amazonas</MenuItem>
            <MenuItem value={4}>Amapá</MenuItem>
            <MenuItem value={5}>Bahia</MenuItem>
            <MenuItem value={6}>Ceará</MenuItem>
            <MenuItem value={7}>Distrito Federal</MenuItem>
            <MenuItem value={8}>Espírito Santo</MenuItem>
            <MenuItem value={9}>Goiás</MenuItem>
            <MenuItem value={10}>Maranhão</MenuItem>
            <MenuItem value={11}>Minas Gerais</MenuItem>
            <MenuItem value={12}>Mato Grosso do Sul</MenuItem>
            <MenuItem value={13}>Mato Grosso</MenuItem>
            <MenuItem value={14}>Pará</MenuItem>
            <MenuItem value={15}>Paraíba</MenuItem>
            <MenuItem value={16}>Pernambuco</MenuItem>
            <MenuItem value={17}>Piauí</MenuItem>
            <MenuItem value={18}>Paraná</MenuItem>
            <MenuItem value={19}>Rio de Janeiro</MenuItem>
            <MenuItem value={20}>Rio Grande do Norte</MenuItem>
            <MenuItem value={23}>Rio Grande do Sul</MenuItem>
            <MenuItem value={21}>Rondônia</MenuItem>
            <MenuItem value={22}>Roraima</MenuItem>
            <MenuItem value={24}>Santa Catarina</MenuItem>
            <MenuItem value={25}>Sergipe</MenuItem>
            <MenuItem value={26}>São Paulo</MenuItem>
            <MenuItem value={27}>Tocantins</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          error={errors.photo.length > 0}
          helperText={errors.photo}
          margin="normal"
          type="text"
          label="Link para foto de perfil"
          variant="filled"
          value={values.photo}
          onChange={handleChange('photo')}
          autoComplete="on"
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
          autoComplete="on"
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
          required
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
          autoComplete="on"
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
          required
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
          autoComplete="on"
        />
        <AlreadyHaveAccount onClick={() => navigate('/entrar')}>
          Já possui conta em nossa loja?
          <ClickHere> Clique Aqui</ClickHere>
        </AlreadyHaveAccount>
        <SignUpButton
          loading={isLoading}
          variant="contained"
          color="secondary"
          margin="normal"
          size="large"
          type="submit"
        >
          <strong>Cadastrar</strong>
        </SignUpButton>
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
    width: 100%;
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

  @media (max-width: 800px){
    justify-content: center;
  }
`;

const Logo = styled.span`
    font-size: 45px;
    margin: auto 0 auto 182px;
    color: white;
    font-family: 'Quantico', sans-serif;

     @media (max-width: 800px){
        margin: 0;
        display: flex;
        flex-wrap: wrap;
  }
`;

const PageTitle = styled.span`
    font-size: 45px;
    font-family: 'Quantico', sans-serif;
    font-weight: 700;
    color: #686868;
    margin-top:35px;

    @media (max-width: 800px){
        text-align: center;
        
  }
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

const SignUpButton = styled(LoadingButton)`
  width: 350px;
  font-weight: 700;
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
  color: #fa4098;
  text-decoration: underline;
`;
