import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MotoboyFiltersProps } from "@/types/filters";
import { CreateMotoboyDialog } from "./MotoboyCreateDialog";
import { MotoboyFormData } from "@/types/motoboy";
import { motoboyService } from "@/services/motoboyService";

export function MotoboyFilters({
  activeFilters,
  onApplyFilters,
}: MotoboyFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    city: activeFilters.city || "",
    vehicle: activeFilters.vehicle || "",
  });

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilterForm({ name: "", city: "", vehicle: "" });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
  };

  const handleCreateMotoboy = async (data: MotoboyFormData) => {
    try {
      const createdMotoboy = await motoboyService.create(data);
      console.log("Motoboy criado com sucesso:", createdMotoboy);
    } catch (error) {
      console.error("Erro ao criar motoboy:", error);
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
          placeholder="Filtrar por cidade"
          value={filterForm.city}
          onChange={(e) => handleFilterFormChange("city", e.target.value)}
        />
        <Input
          className="flex-1"
          placeholder="Filtrar por veículo"
          value={filterForm.vehicle}
          onChange={(e) => handleFilterFormChange("vehicle", e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <CreateMotoboyDialog onCreate={handleCreateMotoboy} />
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
