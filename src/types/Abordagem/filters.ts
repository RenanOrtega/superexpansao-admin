import { GenericFilterParams } from "../filters";

export interface AbordagemFilterParams extends GenericFilterParams {
  approachType?: string;
  status?: string;
  telephone?: string;
  lastApproachDate?: string;
  nextApproachDate?: string;
  contactAddressed?: boolean;
  userEmail?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface AbordagemFiltersProps {
  activeFilters: AbordagemFilterParams;
  onApplyFilters: (filters: AbordagemFilterParams) => void;
}
