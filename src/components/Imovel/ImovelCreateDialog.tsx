import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { proprietarioService } from "@/services/proprietarioService";

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
    console.log(data.saleValue);
    try {
      await onCreate(data);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProprietarios = async () => {
    const response = await proprietarioService.get({});
    return response.items;
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
              <CustomFormField
                control={form.control}
                name="address"
                label="Endereço"
                placeholder="Endereço do Imóvel"
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
            <TabsContent value="details" className="flex flex-col gap-3">
              <FormField
                name="proprietarioId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Proprietario</FormLabel>
                      <FormControl>
                        <ProprietarioCombobox
                          fetchProprietarios={fetchProprietarios}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <CustomFormField
                control={form.control}
                name="availability"
                label="Disponibilidade"
                type="text"
                placeholder="Disponibilidade"
              />
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
              <CustomFormField
                control={form.control}
                name="realEstate"
                label="Imobiliaria"
                type="text"
                placeholder="Imobiliaria"
              />
              <div className="flex gap-3">
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
            <TabsContent value="financial" className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="iptuValue"
                label="Valor do IPTU"
                type="number"
                placeholder="IPTU"
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
