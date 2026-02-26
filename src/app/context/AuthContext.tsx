import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  location?: string;
  role?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const API_URL = 'http://localhost:5000/api/auth';

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
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ll_token');
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        location: 'Detecting location...',
        role: data.user.role,
      };

      setIsLoggedIn(true);
      setUser(userData);
      setToken(data.token);
      localStorage.setItem('ll_logged_in', 'true');
      localStorage.setItem('ll_user', JSON.stringify(userData));
      localStorage.setItem('ll_token', data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        location: 'Detecting location...',
        role: data.user.role,
      };

      setIsLoggedIn(true);
      setUser(userData);
      setToken(data.token);
      localStorage.setItem('ll_logged_in', 'true');
      localStorage.setItem('ll_user', JSON.stringify(userData));
      localStorage.setItem('ll_token', data.token);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
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
