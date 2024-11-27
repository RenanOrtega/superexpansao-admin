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
import { DialogForm } from "../DialogForm";
import { Cemiterio, cemiterioSchema } from "@/types/Cemiterio";

type CemiterioEditDialogProps = {
  item: Cemiterio;
  onUpdate: (updatedItem: Cemiterio) => void;
  schema?: z.ZodType;
  fields?: Array<{
    name: keyof z.infer<typeof cemiterioSchema>;
    label: string;
    type?: "text";
    options?: { value: string; label: string }[];
  }>;
};

export function CemiterioEditDialog({
  item,
  onUpdate,
  schema = cemiterioSchema,
  fields = [
    { name: "name", label: "Nome", type: "text" },
    { name: "source", label: "Fonte", type: "text" },
    { name: "telephone", label: "Telefone", type: "text" },
    { name: "address", label: "Endereço", type: "text" },
    { name: "neighboor", label: "Bairro", type: "text" },
    { name: "city", label: "Cidade", type: "text" },
    { name: "state", label: "Estado", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "observations", label: "Observações", type: "text" },
  ],
}: CemiterioEditDialogProps) {
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
    name: keyof z.infer<typeof cemiterioSchema>;
    label: string;
    type?: "text";
    key?: string;
    options?: { value: string; label: string }[];
  }) => {
    switch (field.type) {
      case "text":
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
      default:
        return <h2>Campo não reconhecido</h2>;
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
