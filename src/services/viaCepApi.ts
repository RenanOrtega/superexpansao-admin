import { Address } from "@/types/Address";
import axios from "axios";

const VIACEP_URL = import.meta.env.VITE_VIACEP_URL;

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

    console.log(cleanCep);

    if (cleanCep.length !== 8) {
      console.log(cleanCep.length);
      throw new Error("CEP inválido");
    }

    const response = await viaCepApi.get<ViaCepResponse>(`/${cleanCep}/json`);

    console.log(response);

    if (response.data.erro) {
      console.log(response.data);
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
  },
};
