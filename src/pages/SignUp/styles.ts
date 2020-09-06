import styled from 'styled-components';
import { shade } from 'polished';
import backgroundImage from '../../assets/sign-up-background.png';

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
    color: #f4ede8;
    font-size: 16px;
    line-height: 21px;
    transition: 0.2s;
    margin-bottom: 30px;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
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
