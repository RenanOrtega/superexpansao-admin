export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenExpiration: Date;
}
