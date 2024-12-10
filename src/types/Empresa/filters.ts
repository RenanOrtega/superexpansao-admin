import { GenericFilterParams } from "../filters";

export interface EmpresaFilterParams extends GenericFilterParams {
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface EmpresaFiltersProps {
  activeFilters: EmpresaFilterParams;
  onApplyFilters: (filters: EmpresaFilterParams) => void;
}
