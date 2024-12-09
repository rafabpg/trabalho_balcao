import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
    email: string;
    uid: string;
    id: string;
    cpf: string;
    image: string | null;
    fullName: string;
    role: string;
    rating: number;
}

interface AuthData {
  accessToken: string;
  client: string;
  uid: string;
  user: User;
}

interface AuthContextProps {
  auth: AuthData | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  const login = async (cpf: string, password: string) => {
    try {
      const url = 'https://dynamic-herring-cosmic.ngrok-free.app/api/v1/auth/sign_in';
      const response = await axios.post(url, { cpf, password });
      const authData = {
        accessToken: response.headers['access-token'],
        client: response.headers['client'],
        uid: response.headers['uid'],
        user: response.data.data
      };
      setAuth(authData);

      const cookieData = JSON.stringify(authData);
      document.cookie = `auth=${cookieData}; path=/; expires=${new Date(Date.now() + 31536000).toUTCString()};`;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Login inválido');
    }
  };

  const logout = () => {
    setAuth(null);
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
