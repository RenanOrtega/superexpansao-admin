import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import { Imovel, ImovelFormData } from "@/types/Imovel";
import { ImovelFilterParams } from "@/types/Imovel/filters";

export const imovelService = {
  async get(filters: ImovelFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Imovel>>(
      `${endpoints.imovel}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: ImovelFormData) {
    const response = await api.post<Imovel>(endpoints.imovel, data);
    return response.data;
  },

  async update(id: string, data: Partial<Imovel>) {
    const response = await api.put<Imovel>(`${endpoints.imovel}/${id}`, data);

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.imovel}/${id}`);
  },

  async getById(id: string | undefined) {
    const response = await api.get<Imovel>(`${endpoints.imovel}/${id}`);

    return response.data;
  },
};
