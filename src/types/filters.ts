export interface GenericFilterParams {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: string | number | Date | undefined;
}

export interface MapeadorFilterParams extends GenericFilterParams {
  name?: string;
  city?: string;
  vehicle?: string;
  lastMapping?: string;
}

export interface ProprietarioFilterParams extends GenericFilterParams {
  name?: string;
  source?: string;
  telephone?: string;
  address?: string;
  neighboor?: string;
  city?: string;
  state?: string;
  email?: string;
  updatedAt?: Date;
  createdAt?: Date;
  updatedBy?: string;
}

export interface MapeadorFiltersProps {
  activeFilters: MapeadorFilterParams;
  onApplyFilters: (filters: MapeadorFilterParams) => void;
}

export type FilterFunction<T extends GenericFilterParams> = (
  filters: T
) => void;
