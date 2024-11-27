import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProprietarioCreateDialog } from "./ProprietarioCreateDialog";
import { ProprietarioFormData } from "@/types/Proprietario";
import { proprietarioService } from "@/services/proprietarioService";
import { ProprietarioFiltersProps } from "@/types/Proprietario/filters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Filter } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DialogForm } from "../DialogForm";

export function ProprietarioActions({
  activeFilters,
  onApplyFilters,
}: ProprietarioFiltersProps) {
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

  const handleCreateProprietario = async (data: ProprietarioFormData) => {
    try {
      const createdProprieatario = await proprietarioService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Proprieatario criado com sucesso:", createdProprieatario);
    } catch (error) {
      console.error("Erro ao criar proprietario:", error);
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
          <ProprietarioCreateDialog
            onCreate={handleCreateProprietario}
          ></ProprietarioCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar proprietario"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <>
              <Accordion type="multiple" className="w-full space-y-4 mb-5">
                {/* Dados Pessoais Section */}
                <AccordionItem value="personal-data">
                  <AccordionTrigger>Dados Pessoais</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Nome"
                        value={filterForm.name}
                        onChange={(e) =>
                          handleFilterFormChange("name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Telefone"
                        value={filterForm.telephone}
                        onChange={(e) =>
                          handleFilterFormChange("telephone", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Email"
                        value={filterForm.email}
                        onChange={(e) =>
                          handleFilterFormChange("email", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Fonte"
                        value={filterForm.source}
                        onChange={(e) =>
                          handleFilterFormChange("source", e.target.value)
                        }
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Endereço Section */}
                <AccordionItem value="address">
                  <AccordionTrigger>Endereço</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Endereço"
                        value={filterForm.address}
                        onChange={(e) =>
                          handleFilterFormChange("address", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Bairro"
                        value={filterForm.neighboor}
                        onChange={(e) =>
                          handleFilterFormChange("neighboor", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Cidade"
                        value={filterForm.city}
                        onChange={(e) =>
                          handleFilterFormChange("city", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Estado"
                        value={filterForm.state}
                        onChange={(e) =>
                          handleFilterFormChange("state", e.target.value)
                        }
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Informações do Sistema Section */}
                <AccordionItem value="system-info">
                  <AccordionTrigger>Informações do Sistema</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="flex flex-col gap-3">
                      <Popover>
                        <PopoverTrigger asChild className="flex-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !createdAtDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {createdAtDate ? (
                              format(createdAtDate, "PPP", { locale: ptBR })
                            ) : (
                              <span>Data de Criação</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={createdAtDate}
                            onSelect={handleCreatedAtDate}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild className="flex-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !updateAtDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {updateAtDate ? (
                              format(updateAtDate, "PPP", { locale: ptBR })
                            ) : (
                              <span>Data de Atualização</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={updateAtDate}
                            onSelect={handleUpdateAtDate}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        placeholder="Atualizado por"
                        value={filterForm.updatedBy}
                        onChange={(e) =>
                          handleFilterFormChange("updatedBy", e.target.value)
                        }
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full sm:w-auto"
              >
                Limpar Filtros
              </Button>
              <Button onClick={handleApplyFilters} className="w-full sm:w-auto">
                Aplicar
              </Button>
            </>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
