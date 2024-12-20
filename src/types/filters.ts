export interface GenericFilterParams {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: string | number | Date | boolean | undefined;
}

export type FilterFunction<T extends GenericFilterParams> = (
  filters: T
) => void;
