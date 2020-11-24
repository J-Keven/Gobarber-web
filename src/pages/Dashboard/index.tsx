import React from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ProfileContent,
  Content,
  Schedule,
  Calender,
  NextAppointment,
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
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendendimento a seguir</strong>
            <div>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
                  alt="j-keven"
                />
                <strong>Jhonnas Keven</strong>
              </div>

              <span>
                <FiClock size={20} />
                <p>08:00</p>
              </span>
            </div>
          </NextAppointment>

          {/* < */}
        </Schedule>
        <Calender />
      </Content>
    </Container>
  );
};

export default Dashboard;
