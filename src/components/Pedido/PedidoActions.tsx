import { useState } from "react";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DialogForm } from "../DialogForm";
import { PedidoFormData } from "@/types/Pedido";
import { pedidoService } from "@/services/pedidoService";
import InputFilter from "../InputFilter";
import { PedidoCreateDialog } from "./PedidoCreateDialog";
import { PedidoFiltersProps } from "@/types/Pedido/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export function PedidoActions({
  activeFilters,
  onApplyFilters,
}: PedidoFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    performer: activeFilters.performer || "",
    coordinator: activeFilters.coordinator || "",
    expander: activeFilters.expander || "",
    entryDate: activeFilters.entryDate || "",
    deliveryDate: activeFilters.deliveryDate || "",
    client: activeFilters.client || "",
    order: activeFilters.order || "",
    propertyType: activeFilters.propertyType || "",
    parkingSpaces: activeFilters.parkingSpaces || undefined,
    status: activeFilters.status || "",
    zeroPoint: activeFilters.zeroPoint || "",
    propertyValue: activeFilters.propertyValue || "",
    onlineCreated: activeFilters.onlineCreated || "",
    onlineDate: activeFilters.onlineDate || "",
    city: activeFilters.city || "",
    state: activeFilters.state || "",
    mappingCompleted: activeFilters.mappingCompleted || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
    updatedBy: activeFilters.updatedBy || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
    activeFilters.createdAt ? new Date(activeFilters.createdAt) : undefined
  );
  const [updatedAtDate, setUpdatedAtDate] = useState<Date | undefined>(
    activeFilters.updatedAt ? new Date(activeFilters.updatedAt) : undefined
  );
  const [entryDate, setEntryDate] = useState<Date | undefined>(
    activeFilters.entryDate ? new Date(activeFilters.entryDate) : undefined
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    activeFilters.entryDate ? new Date(activeFilters.entryDate) : undefined
  );
  const [onlineDate, setOnlineDate] = useState<Date | undefined>(
    activeFilters.onlineDate ? new Date(activeFilters.onlineDate) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setCreatedAtDate(undefined);
    setUpdatedAtDate(undefined);
    setDeliveryDate(undefined);
    setEntryDate(undefined);
    setFilterForm({
      performer: "",
      coordinator: "",
      expander: "",
      client: "",
      deliveryDate: "",
      entryDate: "",
      onlineCreated: "",
      onlineDate: "",
      order: "",
      parkingSpaces: undefined,
      propertyType: "",
      propertyValue: "",
      status: "",
      zeroPoint: "",
      city: "",
      mappingCompleted: "",
      state: "",
      createdAt: "",
      updatedAt: "",
      updatedBy: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleDate = (fieldName: string, selectedDate?: Date) => {
    const setters: { [key: string]: (date: Date | undefined) => void } = {
      entryDate: setEntryDate,
      deliveryDate: setDeliveryDate,
      onlineDate: setOnlineDate,
      updatedAtDate: setUpdatedAtDate,
      createdAtDate: setCreatedAtDate,
    };

    if (setters[fieldName]) {
      setters[fieldName](selectedDate);
    }

    handleFilterFormChange(
      fieldName,
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleCreatePedido = async (data: PedidoFormData) => {
    try {
      const createdPedido = await pedidoService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Pedido criado com sucesso:", createdPedido);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <PedidoCreateDialog
            onCreate={handleCreatePedido}
          ></PedidoCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar Imóvel"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <>
              <Accordion type="multiple" className="w-full space-y-4 mb-5">
                <AccordionItem value="team">
                  <AccordionTrigger>Equipe</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-3 gap-2 grid-cols-1">
                      <InputFilter
                        label="Coordenador"
                        placeholder="Coordenador"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("coordinator", e.target.value)
                        }
                        value={filterForm.coordinator}
                      />
                      <InputFilter
                        label="Responsavel"
                        placeholder="Responsavel"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("performer", e.target.value)
                        }
                        value={filterForm.performer}
                      />
                      <InputFilter
                        label="Expansor"
                        placeholder="Expansor"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("expander", e.target.value)
                        }
                        value={filterForm.expander}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="details">
                  <AccordionTrigger>Detalhes</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                      <InputFilter
                        type="date"
                        label="Data de entrada"
                        placeholder="Selecione uma data"
                        date={entryDate}
                        fieldName="entryDate"
                        handleDate={handleDate}
                      />
                      <InputFilter
                        type="date"
                        label="Data de entrega"
                        placeholder="Selecione uma data"
                        date={deliveryDate}
                        fieldName="deliveryDate"
                        handleDate={handleDate}
                      />
                      <InputFilter
                        label="Cliente"
                        placeholder="Cliente"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("client", e.target.value)
                        }
                        value={filterForm.client}
                      />
                      <InputFilter
                        label="Pedido"
                        placeholder="Pedido"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("order", e.target.value)
                        }
                        value={filterForm.order}
                      />
                      <InputFilter
                        label="Tipo do imóvel"
                        placeholder="Tipo do imóvel"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("propertyType", e.target.value)
                        }
                        value={filterForm.propertyType}
                      />
                      <InputFilter
                        type="date"
                        label="Data online"
                        placeholder="Selecione uma data"
                        date={onlineDate}
                        fieldName="onlineDate"
                        handleDate={handleDate}
                      />
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                      <InputFilter
                        label="Vagas"
                        placeholder="Vagas"
                        type="number"
                        onChange={(e) =>
                          handleFilterFormChange(
                            "parkingSpaces",
                            e.target.value
                          )
                        }
                        value={filterForm.parkingSpaces}
                      />
                      <InputFilter
                        label="Status"
                        placeholder="Status"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("status", e.target.value)
                        }
                        value={filterForm.status}
                      />
                      <InputFilter
                        label="Ponto zero"
                        placeholder="Ponto zero"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("zeroPoint", e.target.value)
                        }
                        value={filterForm.zeroPoint}
                      />
                    </div>
                    <InputFilter
                      label="Vulgo do imóvel"
                      placeholder="Vulgo do imóvel"
                      type="text"
                      onChange={(e) =>
                        handleFilterFormChange("propertyValue", e.target.value)
                      }
                      value={filterForm.propertyValue}
                    />
                    <Select
                      onValueChange={(e) =>
                        handleFilterFormChange("onlineCreated", e)
                      }
                      value={filterForm.onlineCreated}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtre por online criado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="true">
                          Sim
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="false">
                          Não
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="local">
                  <AccordionTrigger>Localização</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <InputFilter
                        label="Cidade"
                        placeholder="Cidade"
                        type="text"
                        onChange={(e) =>
                          handleFilterFormChange("city", e.target.value)
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
                    <Select
                      onValueChange={(e) =>
                        handleFilterFormChange("mappingCompleted", e)
                      }
                      value={filterForm.mappingCompleted}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtre por mapeamento completo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="true">
                          Sim
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="false">
                          Não
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="system-info">
                  <AccordionTrigger>Informações do Sistema</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1.5">
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
