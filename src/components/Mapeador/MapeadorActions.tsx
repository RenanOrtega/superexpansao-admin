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
    city: activeFilters.city || "",
    vehicle: activeFilters.vehicle || "",
    lastMapping: activeFilters.lastMapping || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(
    activeFilters.lastMapping ? new Date(activeFilters.lastMapping) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setDate(undefined);
    setFilterForm({ name: "", city: "", vehicle: "", lastMapping: "" });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
    setIsDialogOpen(false);
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreateMapeador = async (data: MapeadorFormData) => {
    try {
      const createdMapeador = await mapeadorService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Mapeador criado com sucesso:", createdMapeador);
    } catch (error) {
      console.error("Erro ao criar mapeador:", error);
    }
  };

  const handleDateSelect = (selectedDate?: Date) => {
    setDate(selectedDate);
    handleFilterFormChange(
      "lastMapping",
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputFilter
                  label="Nome"
                  placeholder="Filtrar por nome"
                  value={filterForm.name}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("name", e.target.value)
                  }
                />
                <InputFilter
                  label="Cidade"
                  placeholder="Filtrar por cidade"
                  value={filterForm.city}
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("city", e.target.value)
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
                date={date}
                setDate={handleDateSelect}
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
