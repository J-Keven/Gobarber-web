import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1220px;

  > img {
    margin-right: 80px;
    height: 80px;
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    transition: 0.9s;

    svg {
      color: #999591;
    }

    &:hover svg {
      color: #ff9000;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 16px;
  }
`;

export const ProfileContent = styled.div`
  > text {
    font-family: 'Roboto Slab';
    font-weight: 400;
    font-size: 16px;
    color: #f4ede8;
    line-height: 24px;

    > strong {
      font-weight: 500;
      color: #ff9000;
      font-size: 18px;
    }
  }
`;

export const Content = styled.main`
  max-width: 1220px;
  display: flex;
  margin: 64px auto;
`;
export const Schedule = styled.div`
  margin-right: 120px;
  flex: 1;

  h1 {
    font-size: 36px;
    color: #f4ede8;
    font-weight: 500;
    margin-bottom: 12px;
  }

  p {
    display: flex;
    align-items: center;
    color: #ff9000;
    size: 16px;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: ' ';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 10px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;
  > strong {
    size: 20px;
    color: #999591;
    font-weight: 400;
  }

  > div {
    display: flex;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    padding: 22px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      content: '';
      height: 80%;
      background: #ff9000;
      width: 2px;
      top: 10%;
      left: 0;
    }
    div {
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      > strong {
        margin-left: 24px;
        font-size: 24px;
        font-weight: 500;
        font-family: 'Roboto slab';
        color: #f4ede8;
      }
    }

    span {
      display: flex;
      margin-left: auto;
      align-items: center;
      > svg {
        margin-right: 10px;
        color: #ff9000;
      }

      p {
        color: #999591;
        font: 400 20px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    border-bottom: 1px solid #999591;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 26px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;

    svg {
      color: #ff9000;
      margin-right: 11.68px;
    }
    p {
      color: #f4ede8;
    }
  }

  div {
    margin-left: 26px;
    background-color: #3e3b47;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 16px;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      margin-left: 16px;
      color: #f4ede8;
    }
  }
`;

export const Calender = styled.aside`
  width: 360px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
