import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import LogoImage from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toastContext';
import getValidatorErros from '../../utils/getValidatorErros';
import apiClient from '../../services/apiClient';
import { Container, Content, AnimetedContainer, Background } from './styles';

interface ForgotPasswordDataForm {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmitForm = useCallback(
    async (data: ForgotPasswordDataForm) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um E-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await apiClient.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Email de recuperação de senha',
          message:
            'Enviamos um email de recuperação de senha para sua conta de email, cheque sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidatorErros(err);
          formRef.current?.setErrors(erros);
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao Recuperar a Senha',
            message:
              'Ocorreu um erro ao realizar a recuperação de senha. Tente novamente.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimetedContainer>
          <img src={LogoImage} alt="gobarber logo" />
          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <h1>Recupere sua senha</h1>

            <Input
              name="email"
              type="e-mail"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={22} />
            Voltar ao login
          </Link>
        </AnimetedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
