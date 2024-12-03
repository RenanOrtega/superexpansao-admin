import { GenericFilterParams } from "../filters";

export interface UserFilterParams extends GenericFilterParams {
  name?: string;
  email?: string;
  role?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface UserFiltersProps {
  activeFilters: UserFilterParams;
  onApplyFilters: (filters: UserFilterParams) => void;
}
