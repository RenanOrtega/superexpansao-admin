import { AuthResponse, LoginCredentials } from "@/types/auth";
import endpoints from "./endpoints";
import api from "./api";

export const authService = {
  async login(data: LoginCredentials) {
    const response = await api.post<AuthResponse>(endpoints.login, data);
    return response.data;
  },

  async refreshToken(
    accessToken: string,
    refreshToken: string
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(endpoints.refreshToken, {
      accessToken,
      refreshToken,
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  setTokens(tokens: AuthResponse) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  },
};
