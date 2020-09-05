import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import LogoImage from '../../assets/logo.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={LogoImage} alt="gobarber logo" />
        <form>
          <h1>Faça seu login</h1>

          <input type="e-mail" placeholder="E-mail" required />

          <input type="password" placeholder="Senha" required />

          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="forgot">
          <FiLogIn size={22} />
          criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
