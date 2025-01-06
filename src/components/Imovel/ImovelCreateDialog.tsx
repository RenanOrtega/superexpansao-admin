import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogForm } from "../DialogForm";
import {
  CreateImovelDialogProps,
  ImovelFormData,
  imovelSchema,
} from "@/types/Imovel";
import { CustomFormField } from "../CustomFormField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProprietarioCombobox } from "../Proprietario/ProprietarioCombobox";
import SelectFormField from "../SelectFormField";
import { Address } from "@/types/Address";
import CepAutocomplete from "../CepAutocomplete";

export function ImovelCreateDialog({ onCreate }: CreateImovelDialogProps) {
  const form = useForm<ImovelFormData>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      address: "",
      city: "",
      neighborhood: "",
      proprietarioId: "",
      zone: "",
      state: "",
      availability: "",
      link: "",
      propertyProfile: "",
      realEstate: "",
      iptuMonthly: 0,
      iptuAnnual: 0,
      rentValue: 0,
      saleValue: 0,
      searchMeterage: 0,
      totalArea: 0,
      cep: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: ImovelFormData) => {
    await onCreate(data);
    form.reset();
    setIsDialogOpen(false);
  };

  const handleAddressChange = (address: Address) => {
    form.setValue("address", address.logradouro);
    form.setValue("neighborhood", address.bairro);
    form.setValue("city", address.cidade);
    form.setValue("state", address.uf);
    form.setValue("cep", address.cep);
    form.setValue("zone", address.regiao);
  };

  return (
    <DialogForm
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      title="Novo imóvel"
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo imóvel
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Tabs defaultValue="location">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="location">Localização</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
            </TabsList>
            <TabsContent value="location" className="flex flex-col gap-3">
              <div className="w-full">
                <CepAutocomplete
                  onAddressChange={handleAddressChange}
                  control={form.control}
                  name="cep"
                />
              </div>
              <CustomFormField
                control={form.control}
                name="address"
                label="Logradouro"
                placeholder="Logradouro do Imóvel"
              />
              <div className="flex gap-3">
                <CustomFormField
                  control={form.control}
                  name="city"
                  label="Cidade"
                  placeholder="Cidade"
                />
                <CustomFormField
                  control={form.control}
                  name="state"
                  label="Estado"
                  placeholder="Estado"
                />
              </div>
              <div className="flex gap-3">
                <CustomFormField
                  control={form.control}
                  name="neighborhood"
                  label="Bairro"
                  placeholder="Bairro"
                />
                <CustomFormField
                  control={form.control}
                  name="zone"
                  label="Zona"
                  placeholder="Zona"
                />
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-2">
              <FormField
                name="proprietarioId"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <ProprietarioCombobox value={value} onChange={onChange} />
                )}
              />
              <SelectFormField
                control={form.control}
                name="availability"
                label="Disponibilidade"
                placeholder="Seleciona a disponibilidade"
                values={["Disponivel", "Alugado", "Indisponivel", "Motivo"]}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="link"
                  label="Link"
                  type="text"
                  placeholder="Link"
                />
                <CustomFormField
                  control={form.control}
                  name="propertyProfile"
                  label="Perfil"
                  type="text"
                  placeholder="Perfil do Imóvel"
                />
              </div>
              <CustomFormField
                control={form.control}
                name="realEstate"
                label="Imobiliaria"
                type="text"
                placeholder="Imobiliaria"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="searchMeterage"
                  label="Metragem de busca"
                  type="number"
                  placeholder="Metragem"
                  onChange={(value) => {
                    return value === "" ? undefined : Number(value);
                  }}
                />
                <CustomFormField
                  control={form.control}
                  name="totalArea"
                  label="Total da area"
                  type="number"
                  placeholder="Total da area"
                  onChange={(value) => {
                    return value === "" ? undefined : Number(value);
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value="financial"
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              <CustomFormField
                control={form.control}
                name="iptuMonthly"
                label="Valor do IPTU mensal"
                type="number"
                placeholder="IPTU mensal"
                onChange={(value) => {
                  return value === "" ? undefined : Number(value);
                }}
              />
              <CustomFormField
                control={form.control}
                name="iptuAnnual"
                label="Valor do IPTU anual"
                type="number"
                placeholder="IPTU anual"
                onChange={(value) => {
                  return value === "" ? undefined : Number(value);
                }}
              />
              <CustomFormField
                control={form.control}
                name="rentValue"
                label="Valor do Aluguel"
                type="number"
                placeholder="Valor do Aluguel"
                onChange={(value) => {
                  return value === "" ? undefined : Number(value);
                }}
              />
              <CustomFormField
                control={form.control}
                name="saleValue"
                label="Valor de Venda"
                type="number"
                placeholder="Valor de Venda"
                onChange={(value) => {
                  return value === "" ? undefined : Number(value);
                }}
              />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
