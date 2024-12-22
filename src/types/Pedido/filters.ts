import { GenericFilterParams } from "../filters";

export interface PedidoFilterParams extends GenericFilterParams {
  performer?: string;
  expander?: string;
  coordinator?: string;
  entryDate?: string;
  deliveryDate?: string;
  client?: string;
  order?: string;
  propertyType?: string;
  parkingSpaces?: number;
  status?: string;
  zeroPoint?: string;
  propertyValue?: string;
  onlineCreated?: string;
  onlineDate?: string;
  city?: string;
  state?: string;
  mappingCompleted?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface PedidoFiltersProps {
  activeFilters: PedidoFilterParams;
  onApplyFilters: (filters: PedidoFilterParams) => void;
}
