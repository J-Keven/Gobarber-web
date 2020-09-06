import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
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
`;
