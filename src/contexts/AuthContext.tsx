import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, DecodedToken } from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { UserSession } from "@/types/User";

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
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth:token");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        setToken(storedToken);
        setUser({
          name: decodedToken.unique_name,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        signOut();
      }
    }
    setLoading(false);
  }, []);

  const signIn = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUser({
        name: decodedToken.unique_name,
        email: decodedToken.email,
        role: decodedToken.role,
      });
      setToken(token);
      localStorage.setItem("auth:token", token);
    } catch (error) {
      signOut();
    }
  };

  const signOut = () => {
    localStorage.removeItem("auth:token");
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
