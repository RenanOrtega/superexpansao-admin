import { GenericFilterParams } from "../filters";

export interface MapeadorFilterParams extends GenericFilterParams {
  name?: string;
  city?: string;
  vehicle?: string;
  lastMapping?: string;
}

export interface MapeadorFiltersProps {
  activeFilters: MapeadorFilterParams;
  onApplyFilters: (filters: MapeadorFilterParams) => void;
}