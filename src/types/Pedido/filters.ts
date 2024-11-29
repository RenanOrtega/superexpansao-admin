import { GenericFilterParams } from "../filters";

export interface PedidoFilterParams extends GenericFilterParams {
  performer?: string;
}

export interface MapeadorFiltersProps {
  activeFilters: PedidoFilterParams;
  onApplyFilters: (filters: PedidoFilterParams) => void;
}
