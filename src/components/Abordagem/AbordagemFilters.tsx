import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { AbordagemFiltersProps } from "@/types/Abordagem/filters";
import { DialogForm } from "../DialogForm";
import InputFilter from "../InputFilter";
import { DialogFooter } from "../ui/dialog";

export function AbordagemFilters({
  activeFilters,
  onApplyFilters,
}: AbordagemFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    approachType: activeFilters.approachType || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
    updatedBy: activeFilters.updatedBy || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
    activeFilters.createdAt ? new Date(activeFilters.createdAt) : undefined
  );
  const [updatedAtDate, setUpdatedAtDate] = useState<Date | undefined>(
    activeFilters.updatedAt ? new Date(activeFilters.updatedAt) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setCreatedAtDate(undefined);
    setUpdatedAtDate(undefined);
    setFilterForm({
      approachType: "",
      createdAt: "",
      updatedAt: "",
      updatedBy: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    console.log(activeFilters);
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreatedAtDate = (selectedDate?: Date) => {
    setCreatedAtDate(selectedDate);
    handleFilterFormChange(
      "createdAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleUpdatedAtDate = (selectedDate?: Date) => {
    setUpdatedAtDate(selectedDate);
    handleFilterFormChange(
      "updatedAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row gap-2">
        <DialogForm
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Filtrar abordagem"
          trigger={
            <Button className="w-full sm:w-auto">
              <Filter />
              Filtrar
            </Button>
          }
        >
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputFilter
                label="Tipo de abordagem"
                placeholder="Filtrar por tipo de abordagem"
                type="text"
                value={filterForm.approachType}
                onChange={(e) =>
                  handleFilterFormChange("approachType", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1.5">
              <InputFilter
                label="Data de criação"
                placeholder="Selecione um data"
                type="date"
                date={createdAtDate}
                setDate={handleCreatedAtDate}
                value={filterForm.createdAt}
              />
              <InputFilter
                label="Data de atualização"
                placeholder="Selecione um data"
                type="date"
                date={updatedAtDate}
                setDate={handleUpdatedAtDate}
                value={filterForm.updatedAt}
              />
            </div>
            <InputFilter
              label="Atualizado por"
              placeholder="Atualizado por"
              type="text"
              onChange={(e) =>
                handleFilterFormChange("updatedBy", e.target.value)
              }
              value={filterForm.updatedBy}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full sm:w-auto"
              >
                Limpar Filtros
              </Button>
              <Button onClick={handleApplyFilters} className="w-full sm:w-auto">
                Aplicar
              </Button>
            </DialogFooter>
          </>
        </DialogForm>
      </div>
    </div>
  );
}
