import axios from "axios";
import { LoginCredentials } from "../types/auth";

const API_URL = "https://localhost:44314/api/auth";

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);

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
