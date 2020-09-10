import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { MessageToast } from '../../hooks/toastContext';
import Toast from './Toast';

interface ToastProps {
  messages: MessageToast[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const messageWithTransition = useTransition(messages, item => item.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });
  return (
    <Container>
      {messageWithTransition.map(({ item, key, props }) => {
        return <Toast key={key} message={item} style={props} />;
      })}
    </Container>
  );
};

export default ToastContainer;
