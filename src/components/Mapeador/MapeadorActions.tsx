import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MapeadorCreateDialog } from "./MapeadorCreateDialog";
import { MapeadorFormData } from "@/types/Mapeador";
import { mapeadorService } from "@/services/mapeadorService";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MapeadorFiltersProps } from "@/types/Mapeador/filters";

export function MapeadorActions({
  activeFilters,
  onApplyFilters,
}: MapeadorFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    city: activeFilters.city || "",
    vehicle: activeFilters.vehicle || "",
    lastMapping: activeFilters.lastMapping || "",
  });

  const [date, setDate] = useState<Date | undefined>(
    activeFilters.lastMapping ? new Date(activeFilters.lastMapping) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setDate(undefined);
    setFilterForm({ name: "", city: "", vehicle: "", lastMapping: "" });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
  };

  const handleCreateMapeador = async (data: MapeadorFormData) => {
    try {
      const createdMapeador = await mapeadorService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Mapeador criado com sucesso:", createdMapeador);
    } catch (error) {
      console.error("Erro ao criar mapeador:", error);
    }
  };

  const handleDateSelect = (selectedDate?: Date) => {
    setDate(selectedDate);
    handleFilterFormChange(
      "lastMapping",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
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
        <div className="flex-1">
          <Select
            onValueChange={(e) => handleFilterFormChange("vehicle", e)}
            value={filterForm.vehicle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtre por veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="Moto">
                Moto
              </SelectItem>
              <SelectItem className="cursor-pointer" value="Carro">
                Carro
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Popover>
          <PopoverTrigger asChild className="flex-1">
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: ptBR })
              ) : (
                <span>Filtrar por data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <MapeadorCreateDialog
            onCreate={handleCreateMapeador}
          ></MapeadorCreateDialog>
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
