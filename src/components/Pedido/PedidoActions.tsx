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

export function PedidoActions({
  activeFilters,
  onApplyFilters,
}: PedidoFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    address: activeFilters.address || "",
    neighborhood: activeFilters.neighborhood || "",
    city: activeFilters.city || "",
    state: activeFilters.state || "",
    zone: activeFilters.zone || "",
    propertyProfile: activeFilters.propertyProfile || "",
    availability: activeFilters.availability || "",
    minRentValue: activeFilters.minRentValue || undefined,
    maxRentValue: activeFilters.maxRentValue || undefined,
    minSaleValue: activeFilters.minSaleValue || undefined,
    maxSaleValue: activeFilters.maxSaleValue || undefined,
    minIptuValue: activeFilters.minIptuValue || undefined,
    maxIptuValue: activeFilters.maxIptuValue || undefined,
    minSearchMeterage: activeFilters.minSearchMeterage || undefined,
    maxSearchMeterage: activeFilters.maxSearchMeterage || undefined,
    minTotalArea: activeFilters.minTotalArea || undefined,
    maxTotalArea: activeFilters.maxTotalArea || undefined,
    realEstate: activeFilters.realEstate || "",
    proprietarioId: activeFilters.proprietarioId || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
    activeFilters.createdAt ? new Date(activeFilters.createdAt) : undefined
  );
  const [updatedAtDate, setUpdatedAtDate] = useState<Date | undefined>(
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
    setUpdatedAtDate(undefined);
    setFilterForm({
      address: "",
      neighborhood: "",
      city: "",
      state: "",
      zone: "",
      propertyProfile: "",
      availability: "",
      minRentValue: undefined,
      maxRentValue: undefined,
      minSaleValue: undefined,
      maxSaleValue: undefined,
      minIptuValue: undefined,
      maxIptuValue: undefined,
      minSearchMeterage: undefined,
      maxSearchMeterage: undefined,
      minTotalArea: undefined,
      maxTotalArea: undefined,
      realEstate: "",
      proprietarioId: "",
      createdAt: "",
      updatedAt: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreatedAtDate = (selectedDate?: Date) => {
    setCreatedAtDate(selectedDate);
    handleFilterFormChange(
      "createdAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleUpdatedAtDate = (selectedDate?: Date) => {
    setUpdatedAtDate(selectedDate);
    handleFilterFormChange(
      "updatedAt",
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
                <AccordionItem value="system-info">
                  <AccordionTrigger>Informações do Sistema</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="flex gap-3">
                      <InputFilter
                        type="date"
                        label="Data de criação"
                        placeholder="Selecione uma data"
                        date={createdAtDate}
                        setDate={handleCreatedAtDate}
                      />
                      <InputFilter
                        type="date"
                        label="Data de atualização"
                        placeholder="Selecione uma data"
                        date={updatedAtDate}
                        setDate={handleUpdatedAtDate}
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
