import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { AuthContextType, DecodedToken } from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { UserSession } from "@/types/User";
import { authService } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const authResponse = await authService.login({ email, password });

      const decodedToken = jwtDecode<DecodedToken>(authResponse.accessToken);

      authService.setTokens(authResponse);
      localStorage.setItem("user", JSON.stringify(decodedToken));

      setUser({
        unique_name: decodedToken.unique_name,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
