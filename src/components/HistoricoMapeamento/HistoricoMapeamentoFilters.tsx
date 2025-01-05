import { useState } from "react";
import { Button } from "../ui/button";
import { Filter, Search, X } from "lucide-react";
import { DialogForm } from "../DialogForm";
import InputFilter from "../InputFilter";
import { format } from "date-fns";
import { DialogFooter } from "../ui/dialog";
import { HistoricoMapeamentoFilterParams } from "@/types/HistoricoMapeamento/filters";

interface HistoricoMapeamentoFiltersProps {
  onFilter: (filters: HistoricoMapeamentoFilterParams) => void;
}

export default function HistoricoMapeamentoFilters({
  onFilter,
}: HistoricoMapeamentoFiltersProps) {
  const [filters, setFilters] = useState<HistoricoMapeamentoFilterParams>({
    cameraType: "",
    routeLink: "",
    value: "",
    createdAt: "",
    updatedAt: "",
    mappingDate: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [createdAt, setCreatedAt] = useState<Date | undefined>(
    filters.createdAt ? new Date(filters.createdAt) : undefined
  );

  const [updatedAt, setUpdatedAt] = useState<Date | undefined>(
    filters.updatedAt ? new Date(filters.updatedAt) : undefined
  );

  const [mappingDate, setMappingDate] = useState<Date | undefined>(
    filters.mappingDate ? new Date(filters.mappingDate) : undefined
  );

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      updatedAt: setUpdatedAt,
      createdAt: setCreatedAt,
      mappingDate: setMappingDate,
    };

    if (setters[fieldName]) {
      setters[fieldName](selectedDate);
    }

    handleFilterFormChange(
      fieldName,
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleFilterFormChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    onFilter(nonEmptyFilters);
    setIsDialogOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      cameraType: "",
      routeLink: "",
      value: "",
      createdAt: "",
      updatedAt: "",
      mappingDate: "",
    };

    setFilters(emptyFilters);
    setCreatedAt(undefined);
    setUpdatedAt(undefined);
    setMappingDate(undefined);
    onFilter({});
  };

  return (
    <DialogForm
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title="Filtrar cliente"
      trigger={
        <Button className="w-full sm:w-auto">
          <Filter />
          Filtrar
        </Button>
      }
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-1">
          <InputFilter
            type="date"
            label="Data de mapeamento"
            placeholder="Selecione uma data"
            date={mappingDate}
            fieldName="mappingDate"
            handleDate={handleDate}
          />
          <InputFilter
            label="Tipo de camera"
            placeholder="Filtrar por camera"
            type="text"
            value={filters.cameraType}
            onChange={(e) =>
              handleFilterFormChange("cameraType", e.target.value)
            }
          />
          <InputFilter
            label="Link da rota"
            placeholder="Filtrar por rota"
            type="text"
            value={filters.routeLink}
            onChange={(e) =>
              handleFilterFormChange("routeLink", e.target.value)
            }
          />
          <InputFilter
            label="Valor"
            placeholder="Filtrar por valor"
            type="number"
            value={filters.value}
            onChange={(e) => handleFilterFormChange("value", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputFilter
            type="date"
            label="Data de criação"
            placeholder="Selecione uma data"
            date={createdAt}
            fieldName="createdAt"
            handleDate={handleDate}
          />
          <InputFilter
            label="Data de atualização"
            placeholder="Selecione uma data"
            type="date"
            date={updatedAt}
            fieldName="updatedAt"
            handleDate={handleDate}
          />
        </div>
        <DialogFooter>
          <Button onClick={applyFilters} className="flex items-center gap-2">
            <Search size={16} /> Filtrar
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full sm:w-auto"
          >
            <X size={16} /> Limpar
          </Button>
        </DialogFooter>
      </>
    </DialogForm>
  );
}
