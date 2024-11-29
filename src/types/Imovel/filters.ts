import { GenericFilterParams } from "../filters";

export interface ImovelFilterParams extends GenericFilterParams {
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zone?: string;
  propertyProfile?: string;
  availability?: string;
  minRentValue?: number;
  maxRentValue?: number;
  minSaleValue?: number;
  maxSaleValue?: number;
  minIptuValue?: number;
  maxIptuValue?: number;
  minSearchMeterage?: number;
  maxSearchMeterage?: number;
  minTotalArea?: number;
  maxTotalArea?: number;
  realEstate?: string;
  proprietarioId?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface ImovelFiltersProps {
  activeFilters: ImovelFilterParams;
  onApplyFilters: (filters: ImovelFilterParams) => void;
}
