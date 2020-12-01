import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  color: #f4ede8;
  > header {
    display: flex;
    align-items: center;
    height: 144px;
    width: 100%;
    background: #28262e;
    margin-bottom: -120px;

    > a {
      text-decoration: none;
      color: #999591;
      margin-left: 180px;
      > svg {
        width: 28px;
        height: 28px;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  margin: 0 auto;

  form {
    margin: 50px 0;
    width: 340px;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 32px;
      text-align: left;
    }

    a {
      margin-top: 20px;
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
`;

export const AvatarInput = styled.div`
  position: relative;
  align-self: center;
  img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    border: 0;
    background: #ff9000;
    transition: 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
      background: transparent;
    }
    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
  }

  input {
    display: none;
  }
`;
