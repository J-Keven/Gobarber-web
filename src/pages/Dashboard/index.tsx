import React, { useCallback, useState, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, isBefore, addHours, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../hooks/authContext';
import Logo from '../../assets/logo.svg';

import 'react-day-picker/lib/style.css';

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

interface MonthAvailabilityProps {
  avilability: boolean;
  day: number;
}

interface AppointmentProps {
  id: string;
  date: Date;
  __user__: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityProps[]
  >([]);

  const [appointmentsOfDay, setAppointmentsOfDay] = useState<
    AppointmentProps[]
  >([]);

  const handleDayChange = useCallback((day: Date, modufiers: DayModifiers) => {
    if (modufiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    apiClient
      .get<MonthAvailabilityProps[]>(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            month: currentMonth.getMonth() + 1,
            year: currentMonth.getFullYear(),
          },
        },
      )
      .then(({ data }) => {
        setMonthAvailability(data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    apiClient
      .get<AppointmentProps[]>('/appointments/me', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(({ data }) => {
        setAppointmentsOfDay(data);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.avilability === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const weekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR }).toUpperCase();
  }, [selectedDate]);

  const appointmentsToMorning = useMemo(() => {
    return appointmentsOfDay.filter(appointment =>
      isBefore(new Date(appointment.date), addHours(selectedDate, 1)),
    );
  }, [appointmentsOfDay, selectedDate]);

  const appointmentsToAfternoon = useMemo(() => {
    return appointmentsOfDay.filter(appointment =>
      isAfter(new Date(appointment.date), addHours(selectedDate, 1)),
    );
  }, [appointmentsOfDay, selectedDate]);

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
              <p>
                Bem Vindo,
                <br />
                <strong>J-keven</strong>
              </p>
            </ProfileContent>
          </Profile>
          <button type="submit" onClick={() => signOut()}>
            <FiPower size={22} />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{weekDay}</span>
          </p>
          <NextAppointment>
            <strong>Agendamento a seguir</strong>
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

            {appointmentsToMorning.map(appointment => {
              return (
                <Appointment>
                  <span>
                    <FiClock size={20} />
                    <p>09:00</p>
                  </span>

                  <div>
                    <img
                      src={appointment.__user__.avatar_url}
                      alt={appointment.__user__.name}
                    />
                    <strong>{appointment.__user__.name}</strong>
                  </div>
                </Appointment>
              );
            })}

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
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDayChange}
            onMonthChange={handleMonthChange}
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
