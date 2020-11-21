import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import LogoImage from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toastContext';
import getValidatorErros from '../../utils/getValidatorErros';
import { Container, Content, AnimetedContainer, Background } from './styles';

interface ForgotPasswordDataForm {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  // const history = useHistory();

  const handleSubmitForm = useCallback(async (data: ForgotPasswordDataForm) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um E-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      //  Fazer a recuperação de senha

      // addToast({
      //   type: 'success',
      //   title: 'Recuperação de senha Realizada',
      //   // message: 'Ocorreu um erro ao fazer login, cheque suas credenciais.',
      // });

      // history.push('/deshboard');
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
    }
  }, []);

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

            <Button type="submit">Recuperar</Button>
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
