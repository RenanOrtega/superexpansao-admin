import { GenericFilterParams } from "../filters";

export interface CemiterioFilterParams extends GenericFilterParams {
  name?: string;
  source?: string;
  telephone?: string;
  address?: string;
  neighboor?: string;
  city?: string;
  state?: string;
  email?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface CemiterioFiltersProps {
  activeFilters: CemiterioFilterParams;
  onApplyFilters: (filters: CemiterioFilterParams) => void;
}
