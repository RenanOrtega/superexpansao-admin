import { GenericFilterParams } from "../filters";

export interface AbordagemFilterParams extends GenericFilterParams {
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface AbordagemFiltersProps {
  activeFilters: AbordagemFilterParams;
  onApplyFilters: (filters: AbordagemFilterParams) => void;
}
