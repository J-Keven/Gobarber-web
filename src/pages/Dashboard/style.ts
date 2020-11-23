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
