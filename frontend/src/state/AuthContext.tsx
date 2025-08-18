import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../api/http';

type AuthContextValue = {
  token: string | null;
  setToken: (t: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const value = useMemo(() => ({ token, setToken }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthCtx must be used within <AuthProvider>');
  return ctx;
}


