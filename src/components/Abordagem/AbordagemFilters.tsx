import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { AbordagemFilterParams } from "@/types/Abordagem/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AbordagemFiltersProps {
  onFilter: (filters: AbordagemFilterParams) => void;
}

export default function AbordagemFilters({ onFilter }: AbordagemFiltersProps) {
  const [filters, setFilters] = useState<AbordagemFilterParams>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleContactAddressedChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      contactAddressed: value === "" ? undefined : value === "true",
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="flex flex-col">
          <label className="text-sm">Tipo abordagem</label>
          <Input
            name="approachType"
            placeholder="Tipo de Abordagem"
            value={filters.approachType || ""}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Status</label>
          <Input
            name="status"
            placeholder="Status"
            value={filters.status || ""}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Telefone</label>
          <Input
            name="telephone"
            placeholder="Telefone"
            value={filters.telephone || ""}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Última Abordagem</label>
          <Input
            type="date"
            name="lastApproachDate"
            value={filters.lastApproachDate || ""}
            onChange={handleDateChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Próxima Abordagem</label>
          <Input
            type="date"
            name="nextApproachDate"
            value={filters.nextApproachDate || ""}
            onChange={handleDateChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Contatado</label>
          <Select
            value={filters.contactAddressed?.toString() || ""}
            onValueChange={handleContactAddressedChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Sim</SelectItem>
              <SelectItem value="false">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-5">
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
    </div>
  );
}
