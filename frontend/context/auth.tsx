import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "@services/api";
import type { AuthUser } from "@services/api";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Empieza en true: mientras revisamos si hay una sesión guardada no sabemos
  // todavía si el usuario debe ver Login o Home, así que no redirigimos aún.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const restoredUser = await api.getMe();
      setUser(restoredUser);
    } catch (err) {
      // Token vencido/ inválido: lo limpiamos para no quedar en loop
      await api.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { user: loggedUser } = await api.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
