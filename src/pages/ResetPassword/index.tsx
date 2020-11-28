import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
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
  password: string;
  confirmPassword: string;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmitForm = useCallback(
    async (data: ForgotPasswordDataForm) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().min(
            6,
            'A senh a deve conter no mínimo 6 caracteres',
          ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password', undefined)],
            'As senhas devem ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }
        const { confirmPassword, password } = data;

        await apiClient.post('/password/reset', {
          password,
          confirmPassword,
          token,
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao resetar senha',
          // message:
          // 'Enviamos um email de recuperação de senha para sua conta de email, cheque sua caixa de entrada.',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidatorErros(err);
          formRef.current?.setErrors(erros);
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            message: 'Ocorreu um erro ao resetar a sua senha. Tente novamente.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimetedContainer>
          <img src={LogoImage} alt="gobarber logo" />
          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova Senha"
            />

            <Input
              name="confirmPassword"
              type="password"
              icon={FiLock}
              placeholder="Confirmação da Senha"
            />

            <Button loading={loading} type="submit">
              Resetar
            </Button>
          </Form>
        </AnimetedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
