import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (token: string, userEmail: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: false,
  loading: false,
});

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth:token");
    const storedUser = localStorage.getItem("auth:user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signIn = (token: string, userEmail: string) => {
    localStorage.setItem("auth:token", token);
    localStorage.setItem("auth:user", JSON.stringify({ email: userEmail }));

    setToken(token);
    setUser({ email: userEmail });
  };

  const signOut = () => {
    localStorage.removeItem("auth:token");
    localStorage.removeItem("auth:user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    signIn,
    signOut,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
