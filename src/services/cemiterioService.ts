import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import { Cemiterio, CemiterioFormData } from "@/types/Cemiterio";
import { CemiterioFilterParams } from "@/types/Cemiterio/filters";

export const cemiterioService = {
  async get(filters: CemiterioFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Cemiterio>>(
      `${endpoints.cemiterio}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: CemiterioFormData) {
    const response = await api.post<Cemiterio>(endpoints.cemiterio, data);
    return response.data;
  },

  async update(id: string, data: Partial<Cemiterio>) {
    const response = await api.put<Cemiterio>(
      `${endpoints.cemiterio}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.cemiterio}/${id}`);
  },

  async getById(id: string) {
    const response = await api.get<Cemiterio>(`${endpoints.cemiterio}/${id}`);

    return response.data;
  },
};
