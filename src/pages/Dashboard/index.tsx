import React from 'react';
import { FiPower } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ProfileContent,
} from './style';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="gobabber logo" />
          <Profile>
            <img
              src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
              alt="User Avatar"
            />
            <ProfileContent>
              <text>
                Bem Vindo,
                <br />
                <strong>J-keven</strong>
              </text>
            </ProfileContent>
          </Profile>
          <button type="submit">
            <FiPower size={22} />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
