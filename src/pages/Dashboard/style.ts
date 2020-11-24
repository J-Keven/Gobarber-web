import styled from 'styled-components';

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

export const Calender = styled.aside`
  width: 360px;
`;
