import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mapeador, mapeadorSchema } from "@/types/Mapeador";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { DialogForm } from "../DialogForm";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type MapeadorEditDialogProps = {
  item: Mapeador;
  onUpdate: (updatedItem: Mapeador) => void;
  schema?: z.ZodType;
  fields?: Array<{
    name: keyof z.infer<typeof mapeadorSchema>;
    label: string;
    type?: "text" | "select" | "date";
    options?: { value: string; label: string }[];
  }>;
};

export function MapeadorEditDialog({
  item,
  onUpdate,
  schema = mapeadorSchema,
  fields = [
    { name: "name", label: "Nome", type: "text" },
    { name: "telephone", label: "Telefone", type: "text" },
    { name: "city", label: "Cidade", type: "text" },
    {
      name: "vehicle",
      label: "Veículo",
      type: "select",
      options: [
        { value: "Moto", label: "Moto" },
        { value: "Carro", label: "Carro" },
      ],
    },
    { name: "pix", label: "PIX", type: "text" },
    { name: "observations", label: "Observações", type: "text" },
    { name: "lastMapping", label: "Último Mapeamento", type: "date" },
  ],
}: MapeadorEditDialogProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...item,
      lastMapping:
        item.lastMapping instanceof Date
          ? item.lastMapping
          : new Date(item.lastMapping),
      createdAt:
        item.createdAt instanceof Date
          ? item.createdAt
          : new Date(item.createdAt),
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof schema>) => {
    onUpdate({
      ...values,
      id: item.id,
      createdAt: item.createdAt,
    });
    setIsDialogOpen(false);
  };

  const renderField = (field: {
    name: keyof z.infer<typeof mapeadorSchema>;
    label: string;
    type?: "text" | "select" | "date";
    key?: string;
    options?: { value: string; label: string }[];
  }) => {
    switch (field.type) {
      case "select":
        {
          console.log(field);
        }
        return (
          <FormField
            control={form.control}
            name={field.name}
            key={field.key}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Selecione um ${field.label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "date":
        return (
          <FormField
            control={form.control}
            name={field.name}
            key={field.key}
            render={({ field: formField }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{field.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !formField.value && "text-muted-foreground"
                        )}
                      >
                        {formField.value ? (
                          format(formField.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formField.value}
                      onSelect={(date) => formField.onChange(date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <DialogForm
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title="Editar mapeador"
      trigger={
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4 text-blue-500 hover:text-blue-700" />
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) =>
            renderField({
              ...field,
              key: `field-${String(field.name)}-${index}`,
            })
          )}
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
