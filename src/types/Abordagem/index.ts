import { Contato } from "../Contato";

export interface Abordagem {
  id: string;
  contatoId: string;
  telephone: string;
  negotiationStatus: string;
  comment: string;
  contactAddressed: boolean;
  approachType: string;
  lastApproachDate: Date;
  nextApproachDate: Date;
}

export interface AbordagemWithContato extends Abordagem {
  contato: Contato;
}
