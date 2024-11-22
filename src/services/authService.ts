import { LoginCredentials } from "../types/auth";
import { api } from "./api";
import endpoints from "./endpoints";

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post(endpoints.login, credentials);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.email);
        return response.data;
      }

      throw new Error("Falha no login");
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};
