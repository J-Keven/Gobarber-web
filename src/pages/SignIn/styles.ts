import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import backgroundImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  color: #f4ede8;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const AnimetedContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  animation: ${appearFromLeft} 1s;
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
