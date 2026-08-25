import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, usersApi } from "../services/api";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    cellNumber: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        usersApi
          .getMe()
          .then(setUser)
          .catch(() => {
            localStorage.removeItem("token");
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { user: u, token } = await authApi.login({ email, password });
    localStorage.setItem("token", token);
    setUser(u);
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    cellNumber: string,
    password: string,
  ) => {
    const { user: u, token } = await authApi.register({
      firstName,
      lastName,
      email,
      cellNumber,
      password,
    });
    localStorage.setItem("token", token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
