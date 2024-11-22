export interface GenericFilterParams {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: string | number | undefined;
}

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

export type FilterFunction<T extends GenericFilterParams> = (
  filters: T
) => void;
