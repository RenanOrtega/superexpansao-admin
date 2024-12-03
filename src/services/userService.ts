import { User, UserFormData } from "@/types/User";
import endpoints from "./endpoints";
import { PaginationResponse } from "@/types/pagination";
import api from "./api";
import { UserFilterParams } from "@/types/User/filters";

export const userService = {
  async get(filters: UserFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<User>>(
      `${endpoints.user}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: UserFormData) {
    const response = await api.post<User>(`${endpoints.user}/register`, data);
    return response.data;
  },

  async update(id: string, data: Partial<User>) {
    const response = await api.put<User>(`${endpoints.user}/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.user}/${id}`);
  },

  async getById(id: string) {
    const response = await api.get<User>(`${endpoints.user}/${id}`);
    return response.data;
  },
};
