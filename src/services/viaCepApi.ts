import { Address } from "@/types/Address";
import axios, { AxiosInstance } from "axios";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  regiao: string;
  erro?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_VIACEP_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const viaCepService = {
  async getByCep(cep: string): Promise<Address> {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    try {
      const response = await api.get<ViaCepResponse>(`${cleanCep}/json`);

      if (response.data.erro) {
        throw new Error("CEP não encontrado");
      }

      return {
        cep: cleanCep,
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        uf: response.data.uf,
        complemento: response.data.complemento,
        regiao: response.data.regiao,
      };
    } catch (error) {
      console.error("Erro ao consultar CEP:", error);
      throw new Error("Erro ao consultar o CEP");
    }
  },
};
