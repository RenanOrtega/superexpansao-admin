import { GenericFilterParams } from "../filters";

export interface ProprietarioFilterParams extends GenericFilterParams {
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

export interface ProprietarioFiltersProps {
  activeFilters: ProprietarioFilterParams;
  onApplyFilters: (filters: ProprietarioFilterParams) => void;
}
