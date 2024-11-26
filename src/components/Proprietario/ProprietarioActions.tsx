import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProprietarioCreateDialog } from "./ProprietarioCreateDialog";
import { ProprietarioFormData } from "@/types/Proprietario";
import { proprietarioService } from "@/services/proprietarioService";
import { ProprietarioFiltersProps } from "@/types/Proprietario/filters";

export function ProprietarioActions({
  activeFilters,
  onApplyFilters,
}: ProprietarioFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    city: activeFilters.city || "",
    source: activeFilters.source || "",
  });

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilterForm({ name: "", city: "", source: "" });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
  };

  const handleCreateProprietario = async (data: ProprietarioFormData) => {
    try {
      const createdProprieatario = await proprietarioService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Proprieatario criado com sucesso:", createdProprieatario);
    } catch (error) {
      console.error("Erro ao criar proprietario:", error);
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          className="flex-1"
          placeholder="Filtrar por nome"
          value={filterForm.name}
          onChange={(e) => handleFilterFormChange("name", e.target.value)}
        />
        <Input
          className="flex-1"
          placeholder="Filtrar por fonte"
          value={filterForm.source}
          onChange={(e) => handleFilterFormChange("source", e.target.value)}
        />
        <Input
          className="flex-1"
          placeholder="Filtrar por cidade"
          value={filterForm.city}
          onChange={(e) => handleFilterFormChange("city", e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <ProprietarioCreateDialog
            onCreate={handleCreateProprietario}
          ></ProprietarioCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full sm:w-auto"
          >
            Limpar Filtros
          </Button>
          <Button onClick={handleApplyFilters} className="w-full sm:w-auto">
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}
