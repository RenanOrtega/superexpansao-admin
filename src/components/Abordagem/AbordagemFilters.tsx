import { useState } from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { AbordagemFilterParams } from "@/types/Abordagem/filters";
import InputFilter from "../InputFilter";

interface AbordagemFiltersProps {
  onFilter: (filters: AbordagemFilterParams) => void;
}

export default function AbordagemFilters({ onFilter }: AbordagemFiltersProps) {
  const [filters, setFilters] = useState<AbordagemFilterParams>({});

  const handleFilterFormChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const [lastApproachDate, setLastApproachDate] = useState<Date | undefined>(
    filters.lastApproachDate ? new Date(filters.lastApproachDate) : undefined
  );

  return (
    <>
      <div className="flex gap-2">
        <InputFilter
          placeholder="Tipo de abordagem"
          value={filters.approachType || ""}
          onChange={(e) =>
            handleFilterFormChange("approachType", e.target.value)
          }
          label="Tipo de abordagem"
          type="text"
        />
        <InputFilter
          placeholder="Status"
          value={filters.status || ""}
          onChange={(e) => handleFilterFormChange("status", e.target.value)}
          type="text"
          label="Status"
        />
        <InputFilter
          placeholder="Telefone"
          value={filters.telephone || ""}
          onChange={(e) => handleFilterFormChange("telephone", e.target.value)}
          label="Telefone"
          type="text"
        />
      </div>
      <div className="flex justify-end my-3 gap-2">
        <Button onClick={applyFilters} className="flex items-center gap-2">
          <Search size={16} /> Filtrar
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <X size={16} /> Limpar
        </Button>
      </div>
    </>
  );
}
