import styled from 'styled-components';
import { shade } from 'polished';
import backgroundImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  form {
    margin: 60px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    h1 {
      margin-bottom: 24px;
      font-size: 24px;
      line-height: 32px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;
      font-size: 16px;
      font-weight: normal;

      &::placeholder {
        color: #666360;
      }
      & + input {
        margin-top: 8px;
      }
    }

    button {
      width: 340px;
      margin-top: 24px;
      height: 56px;
      font-weight: 500;
      background: #ff9000;
      border-radius: 10px;
      border: 0;
      transition: 0.2s;
      color: #312e38;
      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      margin-top: 24px;
      text-decoration: none;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #f4ede8;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #ff9000;
    font-size: 16px;
    line-height: 21px;
    transition: 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`;
