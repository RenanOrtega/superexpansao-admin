import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import { ProprietarioFilterParams } from "@/types/filters";
import api from "./api";
import { Proprietario, ProprietarioFormData } from "@/types/proprietario";

export const proprietarioService = {
  async get(filters: ProprietarioFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    // const response = await api.get<PaginationResponse<Proprietario>>(
    //   `${endpoints.proprietario}?${params.toString()}`
    // );

    const response: PaginationResponse<Proprietario> = {
      hasNextPage: false,
      hasPreviousPage: false,
      items: [],
      pageNumber: 1,
      pageSize: 10,
      totalItems: 1,
      totalPages: 1,
    };

    return response;
  },

  async create(data: ProprietarioFormData) {
    // const response = await api.post<Proprietario>(endpoints.proprietario, data);

    const response = {
      data: {},
    };

    return response.data;
  },

  async update(id: string, data: Partial<Proprietario>) {
    // const response = await api.put<Proprietario>(
    //   `${endpoints.proprietario}/${id}`,
    //   data
    // );

    const response = {
      data: {},
    };

    return response.data;
  },

  async delete(id: string) {
    // await api.delete(`${endpoints.proprietario}/${id}`);
  },

  async getById(id: string) {
    // const response = await api.get<Proprietario>(
    //   `${endpoints.proprietario}/${id}`
    // );

    const response = {
      data: {},
    };

    return response.data;
  },
};
