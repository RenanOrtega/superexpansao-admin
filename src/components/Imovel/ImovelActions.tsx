import { useState } from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { DialogForm } from "../DialogForm";
import { ImovelFiltersProps } from "@/types/Imovel/filters";
import { ImovelFormData } from "@/types/Imovel";
import { imovelService } from "@/services/imovelService";
import { ImovelCreateDialog } from "./ImovelCreateDialog";

export function ImovelActions({
  activeFilters,
  onApplyFilters,
}: ImovelFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    source: activeFilters.source || "",
    telephone: activeFilters.telephone || "",
    address: activeFilters.address || "",
    neighboor: activeFilters.neighboor || "",
    city: activeFilters.city || "",
    state: activeFilters.state || "",
    email: activeFilters.email || "",
    updatedBy: activeFilters.updatedBy || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
  });

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

  const handleCreateImovel = async (data: ImovelFormData) => {
    try {
      const createdImovel = await imovelService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Imovel criado com sucesso:", createdImovel);
    } catch (error) {
      console.error("Erro ao criar imovel:", error);
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
          <ImovelCreateDialog
            onCreate={handleCreateImovel}
          ></ImovelCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar imóvel"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <h2>Em manutenção.</h2>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
