import React, { createContext, useCallback, useState, useContext } from 'react';
import apiClient from '../services/apiClient';

interface CredentialsProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  sigIn(credentil: CredentialsProps): Promise<void>;
  signOut(): void;
}

interface UserSate {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [dataUser, setDataUser] = useState<UserSate>(() => {
    const token = localStorage.getItem('@gobarber.token');
    const user = localStorage.getItem('@gobarber.user');

    if (!!token && !!user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as UserSate;
  });

  const sigIn = useCallback(async ({ email, password }: CredentialsProps) => {
    const { data } = await apiClient.post('login', {
      email,
      password,
    });

    localStorage.setItem('@gobarber.token', data.token);
    localStorage.setItem('@gobarber.user', JSON.stringify(data.user));

    setDataUser({
      token: data.token,
      user: data.user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber.token');
    localStorage.removeItem('@gobarber.user');

    setDataUser({} as UserSate);
  }, []);
  return (
    <AuthContext.Provider value={{ user: dataUser.user, sigIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
