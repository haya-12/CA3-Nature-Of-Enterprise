"use client";

import {
  createContext, useContext, useState, useEffect, useCallback,
  type ReactNode,
} from "react";
import type { Student } from "@/lib/types";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface AuthContextValue {
  user: Student | null;
  loading: boolean;
  login:  (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: () => false,
  logout: () => {},
});

const STORAGE_KEY = "campus_user_id";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const id = localStorage.getItem(STORAGE_KEY);
      if (id) setUser(MOCK_STUDENTS.find((s) => s.id === id) ?? null);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const match = MOCK_STUDENTS.find(
      (s) => s.email.toLowerCase() === email.toLowerCase() && s.password === password
    );
    if (match) {
      setUser(match);
      try { localStorage.setItem(STORAGE_KEY, match.id); } catch {}
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
