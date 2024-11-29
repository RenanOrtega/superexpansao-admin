import { PaginationResponse } from "@/types/pagination";
import api from "./api";
import endpoints from "./endpoints";
import { Pedido, PedidoFormData } from "@/types/Pedido";
import { PedidoFilterParams } from "@/types/Pedido/filters";

export const pedidoService = {
  async get(filters: PedidoFilterParams) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginationResponse<Pedido>>(
      `${endpoints.pedido}?${params.toString()}`
    );

    return response.data;
  },

  async create(data: PedidoFormData) {
    const response = await api.post<Pedido>(endpoints.pedido, data);
    return response.data;
  },

  async update(id: string, data: Partial<Pedido>) {
    const response = await api.put<Pedido>(`${endpoints.pedido}/${id}`, data);

    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.pedido}/${id}`);
  },

  async getById(id: string) {
    const response = await api.get<Pedido>(`${endpoints.pedido}/${id}`);

    return response.data;
  },
};
