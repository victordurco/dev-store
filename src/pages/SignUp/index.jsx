import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { signUp } from '../../services/devStore.services';
import Container from '../shared/Container';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const useQuery = () => React.useMemo(() => new URLSearchParams(search), [search]);

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
    setErrors({ ...errors, [prop]: '' });
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

    if (!values.state) {
      Swal.fire({
        icon: 'error',
        title: 'Selecione um estado',
        text: 'Você precisa selecionar o estado que você mora',
      });
      setIsLoading(false);
      return;
    }

    if (values.password.length < 6) {
      setErrors({
        ...errors,
        password: 'A senha deve conter pelo menos 6 caracteres',
      });
      setIsLoading(false);
      return;
    }

    if (values.confirmPassword.length < 6) {
      setErrors({
        ...errors,
        confirmPassword: 'A senha deve conter pelo menos 6 caracteres',
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
        Swal.fire({
          title: 'Sucesso',
          text: 'Cadastro realizado!',
          icon: 'success',
          confirmButtonColor: '#FA4098',
          confirmButtonText: 'Entrar',
        }).then(() => {
          if (next) {
            navigate(`/entrar?next=${next}`);
          } else {
            navigate(`/entrar${search}`);
          }
        });
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
      <PageTitle>Criar seu cadastro</PageTitle>
      <SignUpForm
        values={values}
        errors={errors}
        sendSignUpForm={sendSignUpForm}
        handleChange={handleChange}
        isLoading={isLoading}
        search={search}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
      />
    </Container>
  );
};

export default SignUp;

const PageTitle = styled.span`
  font-size: 45px;
  font-family: 'Quantico', sans-serif;
  font-weight: 700;
  color: #686868;

  @media(max-width: 800px) {
    text-align: center;
    font-size: 30px;
  }
`;
