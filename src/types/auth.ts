import { UserSession } from "./User";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface DecodedToken {
  unique_name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  signIn: (token: string, userEmail: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
