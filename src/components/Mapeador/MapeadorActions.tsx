import { useState } from "react";
import { Button } from "../ui/button";
import { MapeadorCreateDialog } from "./MapeadorCreateDialog";
import { MapeadorFormData } from "@/types/Mapeador";
import { mapeadorService } from "@/services/mapeadorService";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MapeadorFiltersProps } from "@/types/Mapeador/filters";
import { DialogForm } from "../DialogForm";
import InputFilter from "../InputFilter";
import { DialogFooter } from "../ui/dialog";

export function MapeadorActions({
  activeFilters,
  onApplyFilters,
}: MapeadorFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    cameraType: activeFilters.cameraType || "",
    celphoneModel: activeFilters.celphoneModel || "",
    city: activeFilters.city || "",
    zone: activeFilters.zone || "",
    vehicle: activeFilters.vehicle || "",
    lastMapping: activeFilters.lastMapping || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [lastMappingDate, setLastMappingDate] = useState<Date | undefined>(
    activeFilters.lastMapping ? new Date(activeFilters.lastMapping) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setLastMappingDate(undefined);
    setFilterForm({
      name: "",
      city: "",
      zone: "",
      vehicle: "",
      cameraType: "",
      celphoneModel: "",
      lastMapping: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
    setIsDialogOpen(false);
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreateMapeador = async (data: MapeadorFormData) => {
    await mapeadorService.create(data);
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
  };

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      lastMappingDate: setLastMappingDate,
    };

    if (setters[fieldName]) {
      setters[fieldName](selectedDate);
    }

    handleFilterFormChange(
      fieldName,
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <MapeadorCreateDialog
            onCreate={handleCreateMapeador}
          ></MapeadorCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar Mapeador"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <div className="space-y-4">
              <InputFilter
                label="Nome"
                placeholder="Filtrar por nome"
                value={filterForm.name}
                type="text"
                onChange={(e) => handleFilterFormChange("name", e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputFilter
                  label="Cidade"
                  placeholder="Filtrar por cidade"
                  value={filterForm.city}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("city", e.target.value)
                  }
                />
                <InputFilter
                  label="Zona"
                  placeholder="Filtrar por zona"
                  value={filterForm.zone}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("zone", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputFilter
                  label="Tipo de camera"
                  placeholder="Filtrar por camera"
                  value={filterForm.cameraType}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("cameraType", e.target.value)
                  }
                />
                <InputFilter
                  label="Modelo do celular"
                  placeholder="Filtrar por celular"
                  value={filterForm.celphoneModel}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("celphoneModel", e.target.value)
                  }
                />
              </div>
              <Select
                onValueChange={(e) => handleFilterFormChange("vehicle", e)}
                value={filterForm.vehicle}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtre por veículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="Moto">
                    Moto
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Carro">
                    Carro
                  </SelectItem>
                </SelectContent>
              </Select>
              <InputFilter
                label="Último mapeamento"
                placeholder="Selecione um data"
                type="date"
                date={lastMappingDate}
                fieldName="lastMappingDate"
                handleDate={handleDate}
                value={filterForm.lastMapping}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="w-full sm:w-auto"
                >
                  Aplicar
                </Button>
              </DialogFooter>
            </div>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
