import { useState } from "react";
import { Button } from "../ui/button";
import { Filter, Search, X } from "lucide-react";
import { ContatoFilterParams } from "@/types/Contato/filters";
import { DialogForm } from "../DialogForm";
import InputFilter from "../InputFilter";
import { format } from "date-fns";
import { DialogFooter } from "../ui/dialog";

interface ContatoFiltersProps {
  onFilter: (filters: ContatoFilterParams) => void;
}

export default function ContatoFilters({ onFilter }: ContatoFiltersProps) {
  const [filters, setFilters] = useState<ContatoFilterParams>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
    filters.createdAt ? new Date(filters.createdAt) : undefined
  );

  const [updatedAtDate, setUpdatedAtDate] = useState<Date | undefined>(
    filters.updatedAt ? new Date(filters.updatedAt) : undefined
  );

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      updatedAtDate: setUpdatedAtDate,
      createdAtDate: setCreatedAtDate,
    };

    if (setters[fieldName]) {
      setters[fieldName](selectedDate);
    }

    handleFilterFormChange(
      fieldName.replace("Date", ""),
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
    onFilter(filters);
    setIsDialogOpen(false);
  };

  const clearFilters = () => {
    setFilters({});
    setCreatedAtDate(undefined);
    setUpdatedAtDate(undefined);
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
            label="Nome"
            placeholder="Filtrar por nome"
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterFormChange("name", e.target.value)}
          />
          <InputFilter
            label="Cargo"
            placeholder="Filtrar por cargo"
            type="text"
            value={filters.position}
            onChange={(e) => handleFilterFormChange("position", e.target.value)}
          />
          <InputFilter
            label="Email"
            placeholder="Filtrar por email"
            type="text"
            value={filters.email}
            onChange={(e) => handleFilterFormChange("email", e.target.value)}
          />
          <InputFilter
            label="Telefone"
            placeholder="Filtrar por telefone"
            type="text"
            value={filters.telephone}
            onChange={(e) =>
              handleFilterFormChange("telephone", e.target.value)
            }
          />
          <InputFilter
            label="Cidade"
            placeholder="Filtrar por cidade"
            type="text"
            value={filters.city}
            onChange={(e) => handleFilterFormChange("city", e.target.value)}
          />
          <InputFilter
            label="Estado"
            placeholder="Filtrar por estado"
            type="text"
            value={filters.state}
            onChange={(e) => handleFilterFormChange("state", e.target.value)}
          />
        </div>
        <InputFilter
          label="Area de atuação"
          placeholder="Filtrar por area"
          type="text"
          value={filters.areaOfActivity}
          onChange={(e) =>
            handleFilterFormChange("areaOfActivity", e.target.value)
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputFilter
            type="date"
            label="Data de criação"
            placeholder="Selecione uma data"
            date={createdAtDate}
            fieldName="createdAtDate"
            handleDate={handleDate}
          />
          <InputFilter
            type="date"
            label="Data de atualização"
            placeholder="Selecione uma data"
            date={updatedAtDate}
            fieldName="updatedAtDate"
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
