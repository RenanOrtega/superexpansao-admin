import { useState } from "react";
import { Button } from "../ui/button";
import { EmpresaFormData } from "@/types/Empresa";
import { empresaService } from "@/services/empresaService";
import { EmpresaFiltersProps } from "@/types/Empresa/filters";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { DialogForm } from "../DialogForm";
import { DialogFooter } from "../ui/dialog";
import { EmpresaCreateDialog } from "./EmpresaCreateDialog";

export function EmpresaActions({
  activeFilters,
  onApplyFilters,
}: EmpresaFiltersProps) {
  const [filterForm, setFilterForm] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateAtDate, setUpdateAtDate] = useState<Date | undefined>(
    activeFilters.updatedAt ? new Date(activeFilters.updatedAt) : undefined
  );

  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
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
    setUpdateAtDate(undefined);
    setFilterForm({
      name: "",
      source: "",
      telephone: "",
      address: "",
      neighboor: "",
      city: "",
      state: "",
      email: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreateEmpresa = async (data: EmpresaFormData) => {
    try {
      const createdProprieatario = await empresaService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Proprieatario criado com sucesso:", createdProprieatario);
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
    }
  };

  const handleUpdateAtDate = (selectedDate?: Date) => {
    setUpdateAtDate(selectedDate);
    handleFilterFormChange(
      "updatedAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleCreatedAtDate = (selectedDate?: Date) => {
    setCreatedAtDate(selectedDate);
    handleFilterFormChange(
      "createdAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <EmpresaCreateDialog
            onCreate={handleCreateEmpresa}
          ></EmpresaCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar empresa"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <>
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
            </>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
