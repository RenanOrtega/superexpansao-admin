import { GenericFilterParams } from "../filters";

export interface EmpresaFilterParams extends GenericFilterParams {
  fantasyName?: string;
  category?: string;
  telephone?: string;
  sector?: string;
  socialReason?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface EmpresaFiltersProps {
  activeFilters: EmpresaFilterParams;
  onApplyFilters: (filters: EmpresaFilterParams) => void;
}
