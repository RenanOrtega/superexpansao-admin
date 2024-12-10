import { GenericFilterParams } from "../filters";

export interface ContatoFilterParams extends GenericFilterParams {
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface ContatoFiltersProps {
  activeFilters: ContatoFilterParams;
  onApplyFilters: (filters: ContatoFilterParams) => void;
}
