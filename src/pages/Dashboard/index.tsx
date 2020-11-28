import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
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
  NextAppointment,
  Section,
  Appointment,
  Calender,
} from './style';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDayChange = useCallback((day: Date, modufiers: DayModifiers) => {
    if (modufiers.available) {
      setSelectedDate(day);
    }
  }, []);
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

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock size={20} />
                <p>09:00</p>
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
                  alt="j-keven"
                />
                <strong>Jhonnas Keven</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock size={20} />
                <p>09:00</p>
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
                  alt="j-keven"
                />
                <strong>Jhonnas Keven</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock size={20} />
                <p>09:00</p>
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
                  alt="j-keven"
                />
                <strong>Jhonnas Keven</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock size={20} />
                <p>09:00</p>
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/50251304?s=460&u=f3ac62e5d926b4c8f2a8bc93e548ea7443ff5dbb&v=4"
                  alt="j-keven"
                />
                <strong>Jhonnas Keven</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calender>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDayChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novenbro',
              'Dezembro',
            ]}
          />
        </Calender>
      </Content>
    </Container>
  );
};

export default Dashboard;
