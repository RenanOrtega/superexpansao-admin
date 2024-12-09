import { GenericFilterParams } from "../filters";

export interface PedidoFilterParams extends GenericFilterParams {
  performer?: string;
}

export interface PedidoFiltersProps {
  activeFilters: PedidoFilterParams;
  onApplyFilters: (filters: PedidoFilterParams) => void;
}
