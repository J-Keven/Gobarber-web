import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import LogoImage from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/authContext';
import { useToast } from '../../hooks/toastContext';
import getValidatorErros from '../../utils/getValidatorErros';
import { Container, Content, Background } from './styles';

interface signInDataForm {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { sigIn } = useAuth();
  const { addToast } = useToast();
  const handleSubmitForm = useCallback(
    async (data: signInDataForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um E-mail válido'),
          password: Yup.string().required('Senha obrigatório'),
        });
        await sigIn({
          email: data.email,
          password: data.password,
        });
        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidatorErros(err);
          formRef.current?.setErrors(erros);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          message: 'Ocorreu um erro ao faxer o login, cheque suas credenciasi.',
        });
      }
    },
    [sigIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={LogoImage} alt="gobarber logo" />
        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <h1>Faça seu login</h1>

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

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <Link to="/siginUp">
          <FiLogIn size={22} />
          criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
