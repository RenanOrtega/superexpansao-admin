import { Address } from "@/types/Address";
import axios from "axios";

const VIACEP_URL = "https://viacep.com.br/ws";

const viaCepApi = axios.create({
  baseURL: VIACEP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const viaCepService = {
  async getByCep(cep: string): Promise<Address> {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    try {
      const response = await viaCepApi.get<ViaCepResponse>(`/${cleanCep}/json`);

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
