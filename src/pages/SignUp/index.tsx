import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { useToast } from '../../hooks/toastContext';
import apiClient from '../../services/apiClient';
import getValidatorErros from '../../utils/getValidatorErros';
import LogoImage from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, AnimetedContainer, Background } from './styles';

interface signUpDataForm {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmitForm = useCallback(
    async (data: signUpDataForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name obrigatorio'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um E-mail válido'),
          password: Yup.string().min(6, 'Senha no minimo 6 caracteries'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await apiClient.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          message:
            'Seu cadastro foi realizado, você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidatorErros(err);
          formRef.current?.setErrors(erros);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no Cadastro',
            message: 'Ocorreu um erro ao fazer o cadastro, Tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimetedContainer>
          <img src={LogoImage} alt="gobarber logo" />
          <Form onSubmit={handleSubmitForm} ref={formRef}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />

            <Input
              name="email"
              type="e-mail"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={22} />
            Voltar para o login
          </Link>
        </AnimetedContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
