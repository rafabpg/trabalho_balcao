import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

export interface User {
    email: string;
    uid: string;
    id: string;
    cpf: string;
    image: string | null;
    fullName: string;
    role: string;
    rating: number;
}

export interface AuthData {
  accessToken: string;
  client: string;
  uid: string;
}

export interface AuthContextProps {
  auth: AuthData | null;
  currentUser: User | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [currentUser, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const restoreAuthFromLocalStorage = async () => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        setAuth(parsedData);

        const { accessToken, client, uid } = parsedData;

        const response = await api.get('/auth/validate_token', {
          headers: {
            'access-token': accessToken,
            client: client,
            uid: uid,
          },
        });

        setUser(response.data.data);
      } catch (error) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    restoreAuthFromLocalStorage();
  }, []);

  const login = async (cpf: string, password: string) => {
    try {
      const response = await api.post('/auth/sign_in', { cpf, password });
      const authData = {
        accessToken: response.headers['access-token'],
        client: response.headers['client'],
        uid: response.headers['uid'],
      };
      setAuth(authData);
      setUser(response.data.data);
      localStorage.setItem('auth', JSON.stringify(authData));
      navigate('/');
    } catch (error) {
      throw new Error('Login inválido');
    }
  };
  
  const logout = () => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ auth, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
