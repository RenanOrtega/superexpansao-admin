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
import InputFilter from "../InputFilter";

export function EmpresaActions({
  activeFilters,
  onApplyFilters,
}: EmpresaFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    fantasyName: activeFilters.fantasyName || "",
    category: activeFilters.category || "",
    telephone: activeFilters.telephone || "",
    sector: activeFilters.sector || "",
    socialReason: activeFilters.socialReason || "",
    updatedBy: activeFilters.updatedBy || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateAtDate, setUpdatedAtDate] = useState<Date | undefined>(
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
    setUpdatedAtDate(undefined);
    setFilterForm({
      fantasyName: "",
      category: "",
      telephone: "",
      sector: "",
      socialReason: "",
      updatedAt: "",
      updatedBy: "",
      createdAt: "",
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

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      updatedAtDate: setUpdatedAtDate,
      createdAtDate: setCreatedAtDate,
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputFilter
                  label="Nome fantasia"
                  placeholder="Nome fantasia"
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("fantasyName", e.target.value)
                  }
                  value={filterForm.fantasyName}
                />
                <InputFilter
                  label="Razão social"
                  placeholder="Razão social"
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("socialReason", e.target.value)
                  }
                  value={filterForm.socialReason}
                />
                <InputFilter
                  label="Setor"
                  placeholder="Setor"
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("sector", e.target.value)
                  }
                  value={filterForm.sector}
                />
                <InputFilter
                  label="Categoria"
                  placeholder="Categoria"
                  type="text"
                  onChange={(e) =>
                    handleFilterFormChange("category", e.target.value)
                  }
                  value={filterForm.category}
                />
              </div>

              <InputFilter
                label="Telefone"
                placeholder="Telefone"
                type="text"
                onChange={(e) =>
                  handleFilterFormChange("telephone", e.target.value)
                }
                value={filterForm.telephone}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1.5">
                <InputFilter
                  label="Data de criação"
                  placeholder="Selecione um data"
                  type="date"
                  date={createdAtDate}
                  fieldName="createdAtDate"
                  handleDate={handleDate}
                  value={filterForm.createdAt}
                />
                <InputFilter
                  label="Data de atualização"
                  placeholder="Selecione um data"
                  type="date"
                  date={updateAtDate}
                  fieldName="updatedAtDate"
                  handleDate={handleDate}
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
