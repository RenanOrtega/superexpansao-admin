import { GenericFilterParams } from "../filters";

export interface ContatoFilterParams extends GenericFilterParams {
  email?: string;
  telephone?: string;
  name?: string;
  position?: string;
  city?: string;
  state?: string;
  areaOfActivity?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}
