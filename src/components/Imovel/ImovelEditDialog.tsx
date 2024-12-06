import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import * as z from "zod";
import { Imovel, imovelSchema } from "@/types/Imovel";
import { CustomFormField } from "../CustomFormField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProprietarioCombobox } from "../Proprietario/ProprietarioCombobox2";

type ImovelEditDialogProps = {
  item: Imovel;
  onUpdate: (updatedItem: Imovel) => void;
  onOpenChange: () => void;
  isOpen: boolean;
  schema?: z.ZodType;
};

export function ImovelEditDialog({
  item,
  onUpdate,
  onOpenChange,
  isOpen,
  schema = imovelSchema,
}: ImovelEditDialogProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...item,
      createdAt:
        item.createdAt instanceof Date
          ? item.createdAt
          : new Date(item.createdAt),
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    onUpdate({
      ...values,
      id: item.id,
      createdAt: item.createdAt,
    });
    isOpen = false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen">
        <DialogHeader>
          <DialogTitle>Editar Imovel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="location">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="location">Localização</TabsTrigger>
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
              </TabsList>

              <TabsContent value="location">
                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    control={form.control}
                    name="address"
                    label="Endereço"
                    placeholder="Digite o endereço"
                  />
                  <CustomFormField
                    control={form.control}
                    name="neighborhood"
                    label="Bairro"
                    placeholder="Digite o bairro"
                  />
                  <CustomFormField
                    control={form.control}
                    name="city"
                    label="Cidade"
                    placeholder="Digite a cidade"
                  />
                  <CustomFormField
                    control={form.control}
                    name="state"
                    label="Estado"
                    placeholder="Digite o estado"
                  />
                  <CustomFormField
                    control={form.control}
                    name="zone"
                    label="Zona"
                    placeholder="Digite a zona"
                  />
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    control={form.control}
                    name="propertyProfile"
                    label="Perfil do Imóvel"
                    placeholder="Perfil do imóvel"
                  />
                  <FormField
                    name="proprietarioId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proprietario</FormLabel>
                        <FormControl>
                          <ProprietarioCombobox field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CustomFormField
                    control={form.control}
                    name="link"
                    label="Link"
                    placeholder="Link do imóvel"
                  />
                  <CustomFormField
                    control={form.control}
                    name="availability"
                    label="Disponibilidade"
                    placeholder="Disponibilidade do imóvel"
                  />
                  <CustomFormField
                    control={form.control}
                    name="searchMeterage"
                    label="Metragem de Busca"
                    type="number"
                    placeholder="Metragem"
                  />
                  <CustomFormField
                    control={form.control}
                    name="totalArea"
                    label="Área Total"
                    type="number"
                    placeholder="Área total"
                  />
                  <CustomFormField
                    control={form.control}
                    name="realEstate"
                    label="Imobiliária"
                    placeholder="Nome da imobiliária"
                  />
                </div>
              </TabsContent>

              <TabsContent value="financial">
                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    control={form.control}
                    name="rentValue"
                    label="Valor do Aluguel"
                    type="number"
                    placeholder="Valor do aluguel"
                  />
                  <CustomFormField
                    control={form.control}
                    name="saleValue"
                    label="Valor de Venda"
                    type="number"
                    placeholder="Valor de venda"
                  />
                  <CustomFormField
                    control={form.control}
                    name="iptuValue"
                    label="Valor do IPTU"
                    type="number"
                    placeholder="Valor do IPTU"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
