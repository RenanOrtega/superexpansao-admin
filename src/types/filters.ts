export interface GenericFilterParams {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: string | number | Date | undefined;
}

export type FilterFunction<T extends GenericFilterParams> = (
  filters: T
) => void;
