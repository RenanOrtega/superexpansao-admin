export interface GenericFilterParams {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: string | number | undefined;
}

export interface MotoboyFilterParams extends GenericFilterParams {
  name?: string;
  city?: string;
  vehicle?: string;
  lastMapping?: string;
}

export interface MotoboyFiltersProps {
  activeFilters: MotoboyFilterParams;
  onApplyFilters: (filters: MotoboyFilterParams) => void;
}

export type FilterFunction<T extends GenericFilterParams> = (
  filters: T
) => void;
