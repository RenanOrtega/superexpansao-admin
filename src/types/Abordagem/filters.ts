import { GenericFilterParams } from "../filters";

export interface AbordagemFilterParams extends GenericFilterParams {
  approachType?: string;
  status?: string;
  telephone?: string;
  lastApproachDate?: string;
  nextApproachDate?: string;
  contactAddressed?: boolean;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}
