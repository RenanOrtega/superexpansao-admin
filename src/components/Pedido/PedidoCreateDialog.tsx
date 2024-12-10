import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogForm } from "../DialogForm";
import { CustomFormField } from "../CustomFormField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CreatePedidoDialogProps,
  PedidoFormData,
  pedidoSchema,
} from "@/types/Pedido";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import SelectFormField from "../SelectFormField";

export function PedidoCreateDialog({ onCreate }: CreatePedidoDialogProps) {
  const form = useForm<PedidoFormData>({
    resolver: zodResolver(pedidoSchema),
    defaultValues: {
      builtArea: 0,
      city: "",
      coordinator: "",
      client: "",
      expander: "",
      observations: "",
      order: "",
      performer: "",
      propertyType: "",
      state: "",
      status: "",
      streetView: "",
      zeroPoint: "",
      propertyValue: "",
      entryDate: undefined,
      deliveryDate: undefined,
      mappingCompleted: undefined,
      onlineDate: undefined,
      streetViewDate: undefined,
      onlineCreated: false,
      maximumMeterage: 0,
      minimumMeterage: 0,
      parkingSpaces: 0,
      totalArea: 0,
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset({
        ...form.getValues(),
        entryDate: undefined,
        deliveryDate: undefined,
        streetViewDate: undefined,
        onlineDate: undefined,
      });
    }
  };

  const onSubmit = async (data: PedidoFormData) => {
    try {
      await onCreate({ ...data });
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogForm
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      title="Novo pedido"
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo pedido
        </Button>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => {
              onSubmit(data);
            },
            (errors) => {
              console.error("Erros de validação:", errors);
            }
          )}
          className="space-y-4"
        >
          <Tabs defaultValue="team">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="team">Equipe</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="location">Local</TabsTrigger>
              <TabsTrigger value="metragens">Metragens</TabsTrigger>
            </TabsList>
            <TabsContent value="team" className="grid grid-cols-2 gap-2">
              <CustomFormField
                control={form.control}
                name="coordinator"
                label="Coordenador"
                placeholder="Coordenador"
              />
              <CustomFormField
                control={form.control}
                name="performer"
                label="Responsavel"
                placeholder="Responsavel"
              />
              <CustomFormField
                control={form.control}
                name="expander"
                label="Expansor"
                placeholder="Expansor"
              />
            </TabsContent>
            <TabsContent value="details" className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de entrada</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de entrega</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CustomFormField
                control={form.control}
                name="client"
                label="Cliente"
                placeholder="Cliente"
              />
              <CustomFormField
                control={form.control}
                name="order"
                label="Numero do pedido"
                placeholder="Numero do pedido"
              />
              <CustomFormField
                control={form.control}
                name="propertyType"
                label="Tipo de imóvel"
                placeholder="Tipo de imóvel"
              />
              <CustomFormField
                control={form.control}
                name="parkingSpaces"
                label="Quantidade de vagas"
                placeholder="Quantidade de vagas"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="status"
                label="Status"
                placeholder="Status"
              />
              <CustomFormField
                control={form.control}
                name="zeroPoint"
                label="Ponto zero"
                placeholder="Ponto zero"
              />
              <CustomFormField
                control={form.control}
                name="propertyValue"
                label="Vulgo do imóvel"
                placeholder="Vulgo do imóvel"
              />
              <CustomFormField
                control={form.control}
                name="observations"
                label="Observações"
                placeholder="Observações"
              />
              <SelectFormField
                control={form.control}
                label="Online criado"
                name="onlineCreated"
                placeholder="Selecione"
                values={[true, false]}
                labels={["Sim", "Não"]}
              />
              <FormField
                control={form.control}
                name="onlineDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data online</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="location" className="grid grid-cols-2 gap-2">
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
              <CustomFormField
                control={form.control}
                name="streetView"
                label="StreetView"
                placeholder="StreetView"
              />
              <FormField
                control={form.control}
                name="streetViewDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do SteetView</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SelectFormField
                control={form.control}
                label="Mapeamento completo"
                name="mappingCompleted"
                placeholder="Selecione"
                values={[true, false]}
                labels={["Sim", "Não"]}
              />
            </TabsContent>
            <TabsContent value="metragens" className="grid grid-cols-2 gap-2">
              <CustomFormField
                control={form.control}
                name="maximumMeterage"
                label="Metragem Máx"
                placeholder="Metragem Máx"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="minimumMeterage"
                label="Metragem Mín"
                placeholder="Metragem Mín"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="totalArea"
                label="Area total"
                placeholder="Area total"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="builtArea"
                label="Area construida"
                placeholder="Area construida"
                type="number"
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
