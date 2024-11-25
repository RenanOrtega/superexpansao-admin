import { AuthResponse, LoginCredentials } from "@/types/auth";
import endpoints from "./endpoints";
import api from "./api";

export const authService = {
  async login(data: LoginCredentials) {
    const response = await api.post<AuthResponse>(endpoints.login, data);
    return response.data;
  },
};
