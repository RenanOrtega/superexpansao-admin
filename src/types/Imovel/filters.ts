import { GenericFilterParams } from "../filters";

export interface ImovelFilterParams extends GenericFilterParams {
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

export interface ImovelFiltersProps {
  activeFilters: ImovelFilterParams;
  onApplyFilters: (filters: ImovelFilterParams) => void;
}
