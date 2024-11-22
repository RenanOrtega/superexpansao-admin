import { PaginationResponse } from "@/types/pagination";
import { Motoboy, MotoboyFormData } from "../types/motoboy";
import { api } from "./api";
import endpoints from "./endpoints";
import { MotoboyFilterParams } from "@/types/filters";

export const motoboyService = {
  async get(filters: MotoboyFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Motoboy>>(
      `${endpoints.motoboy}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: MotoboyFormData) {
    const response = await api.post<Motoboy>(endpoints.motoboy, data);
    return response.data;
  },

  async update(id: string, data: Partial<Motoboy>) {
    const response = await api.put<Motoboy>(`${endpoints.motoboy}/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.motoboy}/${id}`);
  },

  async getById(id: string) {
    const response = await api.get<Motoboy>(`${endpoints.motoboy}/${id}`);
    return response.data;
  },
};
