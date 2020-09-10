import styled, { css } from 'styled-components';

interface ToastType {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}
export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  padding: 30px;
`;

const toastTypesVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};
export const Toast = styled.div<ToastType>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;

  border-radius: 10px;
  box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.2);

  ${props => toastTypesVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  display: flex;
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 20px;
    border: 0;
    opacity: 0.6;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;
    `}
`;
