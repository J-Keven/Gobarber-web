import React, { createContext, useCallback } from 'react';

interface AuthContextProps {
  name: string;
  sigIn(): void;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvide: React.FC = ({ children }) => {
  const sigIn = useCallback(() => {
    console.log('sdsadsddsadsdsaddsads');
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'jhonnas', sigIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvide };
