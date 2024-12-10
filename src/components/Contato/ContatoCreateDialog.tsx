"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateContatoDialogProps,
  ContatoFormData,
  contatoSchema,
} from "@/types/Contato";
import { DialogFooter } from "../ui/dialog";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";

export function ContatoCreateDialog({
  onCreate,
  empresaId,
}: CreateContatoDialogProps) {
  const form = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      email: "",
      name: "",
      position: "",
      telephone: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: ContatoFormData) => {
    try {
      await onCreate(data, empresaId);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogForm
      title="Novo contato"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo contato
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
          className="space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <CustomFormField
              control={form.control}
              label="Nome"
              name="name"
              placeholder="Nome"
            />
            <CustomFormField
              control={form.control}
              label="Cargo"
              name="position"
              placeholder="Cargo"
            />
          </div>
          <CustomFormField
            control={form.control}
            label="Email"
            name="email"
            placeholder="Email"
          />
          <TelephoneFormField control={form.control} name="telephone" />
          <DialogFooter>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
