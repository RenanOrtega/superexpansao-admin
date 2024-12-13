import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { ContatoFilterParams } from "@/types/Contato/filters";

interface ContatoFiltersProps {
  onFilter: (filters: ContatoFilterParams) => void;
}

export default function ContatoFilters({ onFilter }: ContatoFiltersProps) {
  const [filters, setFilters] = useState<ContatoFilterParams>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const applyFilters = () => {
    console.log(filters);
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="flex gap-2 mb-5 mt-10">
      <Input
        name="name"
        placeholder="Nome"
        value={filters.name || ""}
        onChange={handleInputChange}
        className="w-full"
      />
      <Input
        name="email"
        placeholder="Email"
        value={filters.email || ""}
        onChange={handleInputChange}
        className="w-full"
      />
      <Input
        name="telephone"
        placeholder="Telefone"
        value={filters.telephone || ""}
        onChange={handleInputChange}
        className="w-full"
      />
      <Input
        name="position"
        placeholder="Cargo"
        value={filters.position || ""}
        onChange={handleInputChange}
        className="w-full"
      />
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
  );
}
