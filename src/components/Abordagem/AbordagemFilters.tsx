import { useState } from "react";
import { Button } from "../ui/button";
import { Filter, Search, X } from "lucide-react";
import { AbordagemFilterParams } from "@/types/Abordagem/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogForm } from "../DialogForm";
import { DialogFooter } from "../ui/dialog";
import InputFilter from "../InputFilter";
import { format } from "date-fns";
import { UserCombobox } from "../User/UserCombobox";

interface AbordagemFiltersProps {
  onFilter: (filters: AbordagemFilterParams) => void;
}

export default function AbordagemFilters({ onFilter }: AbordagemFiltersProps) {
  const [filters, setFilters] = useState<AbordagemFilterParams>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [lastApproachDate, setLastApproachDate] = useState<Date | undefined>(
    filters.lastApproachDate ? new Date(filters.lastApproachDate) : undefined
  );

  const [nextApproachDate, setNextApproachDate] = useState<Date | undefined>(
    filters.nextApproachDate ? new Date(filters.nextApproachDate) : undefined
  );

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      lastApproachDate: setLastApproachDate,
      nextApproachDate: setNextApproachDate,
    };

    if (setters[fieldName]) {
      setters[fieldName](selectedDate);
    }

    handleFilterFormChange(
      fieldName,
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleFilterFormChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
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
    setIsDialogOpen(false);
  };

  const clearFilters = () => {
    setFilters({});
    setLastApproachDate(undefined);
    setNextApproachDate(undefined);
    handleContactAddressedChange("");
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
            label="Tipo de abordagem"
            placeholder="Filtrar por abordagem"
            type="text"
            value={filters.approachType}
            onChange={(e) =>
              handleFilterFormChange("approachType", e.target.value)
            }
          />
          <InputFilter
            label="Status"
            placeholder="Filtrar por status"
            type="text"
            value={filters.status}
            onChange={(e) => handleFilterFormChange("status", e.target.value)}
          />
        </div>
        <InputFilter
          label="Telefone"
          placeholder="Filtrar por telefone"
          type="text"
          value={filters.telephone}
          onChange={(e) => handleFilterFormChange("telephone", e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputFilter
            type="date"
            label="Última abordagem"
            placeholder="Selecione uma data"
            date={lastApproachDate}
            fieldName="lastApproachDate"
            handleDate={handleDate}
          />
          <InputFilter
            type="date"
            label="Próxima abordagem"
            placeholder="Selecione uma data"
            date={nextApproachDate}
            fieldName="nextApproachDate"
            handleDate={handleDate}
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
        <UserCombobox
          value={filters.userEmail}
          onChange={(value) => handleFilterFormChange("userEmail", value || "")}
          label="Responsável"
          placeholder="Selecione um responsável"
        />
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
