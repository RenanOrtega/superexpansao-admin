import { PaginationResponse } from "@/types/pagination";
import endpoints from "./endpoints";
import api from "./api";
import { Empresa, EmpresaFormData, EmpresaWithContatos } from "@/types/Empresa";
import { EmpresaFilterParams } from "@/types/Empresa/filters";

export const empresaService = {
  async get(filters: EmpresaFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Empresa>>(
      `${endpoints.empresa}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: EmpresaFormData) {
    const response = await api.post<Empresa>(endpoints.empresa, data);
    return response.data;
  },

  async update(id: string, data: Partial<Empresa>) {
    const response = await api.put<Empresa>(`${endpoints.empresa}/${id}`, data);

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.empresa}/${id}`);
  },

  async getById(id: string | undefined) {
    const response = await api.get<EmpresaWithContatos>(
      `${endpoints.empresa}/${id}`
    );

    return response.data;
  },
};
