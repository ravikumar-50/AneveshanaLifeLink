import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateUser: (user: User) => void;
}

const defaultUser: User = {
  name: 'Ravi Kumar',
  email: 'ravi@lifelink.com',
  phone: '+91 9876543210',
  location: 'Tadepalligudem, Andhra Pradesh',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ll_logged_in') === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ll_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string): boolean => {
    const userData: User = {
      name: 'Ravi Kumar',
      email: email || defaultUser.email,
      phone: defaultUser.phone,
      location: defaultUser.location,
    };
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('ll_logged_in', 'true');
    localStorage.setItem('ll_user', JSON.stringify(userData));
    return true;
  };

  const register = (name: string, email: string, phone: string, _password: string): boolean => {
    const userData: User = {
      name,
      email,
      phone,
      location: 'Detecting location...',
    };
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('ll_logged_in', 'true');
    localStorage.setItem('ll_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('ll_logged_in');
    localStorage.removeItem('ll_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('ll_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
