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
import { User, userSchema, userUpdateSchema } from "@/types/User";
import { DialogForm } from "../DialogForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type UserEditDialogProps = {
  item: User;
  onUpdate: (updatedItem: User) => void;
  schema?: z.ZodType;
  fields?: Array<{
    name: keyof z.infer<typeof userUpdateSchema>;
    label: string;
    type?: "text" | "select";
    options?: { value: string; label: string }[];
  }>;
};

export function UserEditDialog({
  item,
  onUpdate,
  schema = userUpdateSchema,
  fields = [
    { name: "name", label: "Nome", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "role",
      label: "Permissão",
      type: "select",
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Moderador", label: "Moderador" },
        { value: "Padrão", label: "Padrão" },
      ],
    },
  ],
}: UserEditDialogProps) {
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
    name: keyof z.infer<typeof userSchema>;
    label: string;
    type?: "text" | "select";
    key?: string;
    options?: { value: string; label: string }[];
  }) => {
    switch (field.type) {
      case "select":
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
      title="Editar user"
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
