import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiLock, FiMail, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/authContext';

import { useToast } from '../../hooks/toastContext';
import apiClient from '../../services/apiClient';
import getValidatorErros from '../../utils/getValidatorErros';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, AvatarInput } from './styles';

interface ProfileDataForm {
  name: string;
  email: string;
  oldPassowrd: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmitForm = useCallback(
    async (data: ProfileDataForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name obrigatorio'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um E-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: value => !!value.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          confirmPassword: Yup.string()
            .when('oldPassword', {
              is: value => !!value.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password', undefined)],
              'As senhas devem ser iguais',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.oldPassowrd
            ? {
                oldPassword: data.oldPassowrd,
                password: data.password,
                confirmPassword: data.confirmPassword,
              }
            : {}),
        };

        const response = await apiClient.put('profile', formData);
        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado',
          message: 'Seu perfil foi atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidatorErros(err);
          formRef.current?.setErrors(erros);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na Atualização de Perfil',
            message: 'Ocorreu um erro ao atualizae o perfil, Tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();

        formData.append('avatar', e.target.files[0]);

        const response = await apiClient.patch('users/avatar', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado',
        });
      }
    },
    [updateUser, addToast],
  );

  return (
    <Container>
      <header>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
      </header>
      <Content>
        <Form
          onSubmit={handleSubmitForm}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          ref={formRef}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>
          <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
          <Input
            containerStyle={{ marginBottom: 24 }}
            name="email"
            type="e-mail"
            icon={FiMail}
            placeholder="E-mail"
          />

          <Input
            name="oldPassword"
            type="password"
            icon={FiLock}
            placeholder="Senha atual"
          />

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova senha"
          />

          <Input
            name="confirmPassword"
            type="password"
            icon={FiLock}
            placeholder="Confirme a senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
