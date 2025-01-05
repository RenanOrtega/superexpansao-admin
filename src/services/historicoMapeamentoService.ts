import {
  HistoricoMapeamento,
  HistoricoMapeamentoFormData,
} from "../types/HistoricoMapeamento";
import endpoints from "./endpoints";
import api from "./api";

export const historicoMapeamentoService = {
  async create(data: HistoricoMapeamentoFormData, mapeadorId: string) {
    const response = await api.post<HistoricoMapeamento>(
      endpoints.historicoMapeamento,
      {
        ...data,
        mapeadorId,
      }
    );
    return response.data;
  },

  async update(id: string, data: Partial<HistoricoMapeamento>) {
    const response = await api.put<HistoricoMapeamento>(
      `${endpoints.historicoMapeamento}/${id}`,
      data
    );
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`${endpoints.historicoMapeamento}/${id}`);
  },

  async getById(id: string | undefined) {
    const response = await api.get<HistoricoMapeamento>(
      `${endpoints.historicoMapeamento}/${id}`
    );
    return response.data;
  },
};
