import React, { useCallback, useState, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
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
  date: string;
  dateFormatted: string;
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

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
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
        const appointmentFormatted = data.map(appointment => {
          return {
            ...appointment,
            dateFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointmentsOfDay(appointmentFormatted);
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
    return appointmentsOfDay.filter(
      appointment => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointmentsOfDay]);

  const appointmentsToAfternoon = useMemo(() => {
    return appointmentsOfDay.filter(
      appointment => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointmentsOfDay]);

  const nextAppointment = useMemo(() => {
    const dateNow = new Date();
    return appointmentsOfDay.find(appointment =>
      isAfter(parseISO(appointment.date), dateNow),
    );
  }, [appointmentsOfDay]);

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
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <div>
                  <img
                    src={nextAppointment.__user__.avatar_url}
                    alt={nextAppointment.__user__.name}
                  />
                  <strong>{nextAppointment.__user__.name}</strong>
                </div>

                <span>
                  <FiClock size={20} />
                  <p>{nextAppointment.dateFormatted}</p>
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {appointmentsToMorning.length === 0 && (
              <p>Nenhum agendamento neste horário</p>
            )}
            {appointmentsToMorning.map(appointment => {
              return (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock size={20} />
                    <p>{appointment.dateFormatted}</p>
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
          </Section>

          <Section>
            <strong>Tarde</strong>

            {appointmentsToAfternoon.length === 0 && (
              <p>Nenhum agendamento neste horário</p>
            )}
            {appointmentsToAfternoon.map(appointment => {
              return (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock size={20} />
                    <p>{appointment.dateFormatted}</p>
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
