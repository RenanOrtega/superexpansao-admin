import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ImovelFiltersProps } from "@/types/Imovel/filters";
import { DialogForm } from "../DialogForm";
import { ImovelCreateDialog } from "./ImovelCreateDialog";
import { ImovelFormData } from "@/types/Imovel";
import { imovelService } from "@/services/imovelService";

export function ImovelActions({
  activeFilters,
  onApplyFilters,
}: ImovelFiltersProps) {
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

  const handleCreateImovel = async (data: ImovelFormData) => {
    try {
      const createdImovel = await imovelService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("Imovel criado com sucesso:", createdImovel);
    } catch (error) {
      console.error("Erro ao criar imovel:", error);
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <ImovelCreateDialog
            onCreate={handleCreateImovel}
          ></ImovelCreateDialog>
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
                {/* Localização Section */}
                <AccordionItem value="location">
                  <AccordionTrigger>Localização</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Endereço</Label>
                        <Input
                          className="mt-1"
                          placeholder="Endereço"
                          value={filterForm.address}
                          onChange={(e) =>
                            handleFilterFormChange("address", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Bairro</Label>
                        <Input
                          className="mt-1"
                          placeholder="Bairro"
                          value={filterForm.neighborhood}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "neighborhood",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Cidade</Label>
                        <Input
                          className="mt-1"
                          placeholder="Cidade"
                          value={filterForm.city}
                          onChange={(e) =>
                            handleFilterFormChange("city", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Estado</Label>
                        <Input
                          className="mt-1"
                          placeholder="Estado"
                          value={filterForm.state}
                          onChange={(e) =>
                            handleFilterFormChange("state", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Zona</Label>
                        <Input
                          className="mt-1"
                          placeholder="Zona"
                          value={filterForm.zone}
                          onChange={(e) =>
                            handleFilterFormChange("zone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Detalhes do Imóvel Section */}
                <AccordionItem value="property-details">
                  <AccordionTrigger>Detalhes do Imóvel</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Perfil do Imóvel</Label>
                        <Input
                          className="mt-1"
                          placeholder="Perfil do Imóvel"
                          value={filterForm.propertyProfile}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "propertyProfile",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Disponibilidade</Label>
                        <Input
                          className="mt-1"
                          placeholder="Disponibilidade"
                          value={filterForm.availability}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "availability",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Imobiliária</Label>
                        <Input
                          className="mt-1"
                          placeholder="Imobiliária"
                          value={filterForm.realEstate}
                          onChange={(e) =>
                            handleFilterFormChange("realEstate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>ID Proprietário</Label>
                        <Input
                          className="mt-1"
                          placeholder="ID Proprietário"
                          value={filterForm.proprietarioId}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "proprietarioId",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Valores Section */}
                <AccordionItem value="values">
                  <AccordionTrigger>Valores</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Valor Mínimo de Aluguel</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Valor Mínimo"
                          value={filterForm.minRentValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "minRentValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Valor Máximo de Aluguel</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Valor Máximo"
                          value={filterForm.maxRentValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "maxRentValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Valor Mínimo de Venda</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Valor Mínimo"
                          value={filterForm.minSaleValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "minSaleValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Valor Máximo de Venda</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Valor Máximo"
                          value={filterForm.maxSaleValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "maxSaleValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>IPTU Mínimo</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="IPTU Mínimo"
                          value={filterForm.minIptuValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "minIptuValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>IPTU Máximo</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="IPTU Máximo"
                          value={filterForm.maxIptuValue}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "maxIptuValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Metragem Section */}
                <AccordionItem value="meterage">
                  <AccordionTrigger>Metragem</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Metragem Mínima de Busca</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Metragem Mínima"
                          value={filterForm.minSearchMeterage}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "minSearchMeterage",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Metragem Máxima de Busca</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Metragem Máxima"
                          value={filterForm.maxSearchMeterage}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "maxSearchMeterage",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Área Total Mínima</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Área Total Mínima"
                          value={filterForm.minTotalArea}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "minTotalArea",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Área Total Máxima</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="Área Total Máxima"
                          value={filterForm.maxTotalArea}
                          onChange={(e) =>
                            handleFilterFormChange(
                              "maxTotalArea",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Informações do Sistema Section */}
                <AccordionItem value="system-info">
                  <AccordionTrigger>Informações do Sistema</AccordionTrigger>
                  <AccordionContent className="m-3">
                    <div className="flex flex-col gap-3">
                      <Popover>
                        <Label>Data de criação</Label>
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
                        <Label>Data de atualização</Label>
                        <PopoverTrigger asChild className="flex-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !updatedAtDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {updatedAtDate ? (
                              format(updatedAtDate, "PPP", { locale: ptBR })
                            ) : (
                              <span>Data de Atualização</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={updatedAtDate}
                            onSelect={handleUpdatedAtDate}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
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
