export interface HistoricoMapeamentoFilterParams {
  mappingDate?: string;
  cameraType?: string;
  routeLink?: string;
  value?: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: string;
}

export interface EmpresaFiltersProps {
  activeFilters: HistoricoMapeamentoFilterParams;
  onApplyFilters: (filters: HistoricoMapeamentoFilterParams) => void;
}
