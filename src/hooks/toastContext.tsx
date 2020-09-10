import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface MessageToast {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  message?: string;
}

interface ToastContextProps {
  addToast(message: Omit<MessageToast, 'id'>): void;
  removerToast(id: string): void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageToast[]>([]);

  const addToast = useCallback(
    ({ title, message, type }: Omit<MessageToast, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        message,
        title,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removerToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removerToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
