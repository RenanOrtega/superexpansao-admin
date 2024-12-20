import { useState } from "react";
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
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { DialogForm } from "../DialogForm";
import InputFilter from "../InputFilter";
import { DialogFooter } from "../ui/dialog";

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <InputFilter
                        label="Nome"
                        placeholder="Nome"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("name", e.target.value)
                        }
                        value={filterForm.name}
                      />
                      <InputFilter
                        label="Telefone"
                        placeholder="Telefone"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("telephone", e.target.value)
                        }
                        value={filterForm.telephone}
                      />
                      <InputFilter
                        label="Email"
                        placeholder="Email"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("email", e.target.value)
                        }
                        value={filterForm.email}
                      />
                      <InputFilter
                        label="Fonte"
                        placeholder="Fonte"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("source", e.target.value)
                        }
                        value={filterForm.source}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Logradouro Section */}
                <AccordionItem value="address">
                  <AccordionTrigger>Localização</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <InputFilter
                        label="Logradouro"
                        placeholder="Logradouro"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("address", e.target.value)
                        }
                        value={filterForm.address}
                      />
                      <InputFilter
                        label="Bairro"
                        placeholder="Bairro"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("neighboor", e.target.value)
                        }
                        value={filterForm.neighboor}
                      />
                      <InputFilter
                        label="Cidade"
                        placeholder="Cidade"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("neighboor", e.target.value)
                        }
                        value={filterForm.city}
                      />
                      <InputFilter
                        label="Estado"
                        placeholder="Estado"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("state", e.target.value)
                        }
                        value={filterForm.state}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Informações do Sistema Section */}
                <AccordionItem value="system-info">
                  <AccordionTrigger>Informações do Sistema</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1.5">
                      <InputFilter
                        label="Data de criação"
                        placeholder="Selecione um data"
                        type="date"
                        date={createdAtDate}
                        setDate={handleCreatedAtDate}
                        value={filterForm.createdAt}
                      />
                      <InputFilter
                        label="Data de atualização"
                        placeholder="Selecione um data"
                        type="date"
                        date={updateAtDate}
                        setDate={handleUpdateAtDate}
                        value={filterForm.updatedAt}
                      />
                    </div>
                    <InputFilter
                      label="Atualizado por"
                      placeholder="Atualizado por"
                      type="text"
                      onChange={(e) =>
                        handleFilterFormChange("updatedBy", e.target.value)
                      }
                      value={filterForm.updatedBy}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="w-full sm:w-auto"
                >
                  Aplicar
                </Button>
              </DialogFooter>
            </>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
