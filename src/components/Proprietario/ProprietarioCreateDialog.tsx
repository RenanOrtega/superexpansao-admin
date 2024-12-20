"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateProprietarioDialogProps,
  ProprietarioFormData,
  proprietarioSchema,
} from "@/types/Proprietario";
import { CustomFormField } from "../CustomFormField";
import { DialogFooter } from "../ui/dialog";
import TelephoneFormField from "../TelephoneFormField";
import { useToast } from "@/hooks/use-toast";

export function ProprietarioCreateDialog({
  onCreate,
}: CreateProprietarioDialogProps) {
  const { toast } = useToast();
  const form = useForm<ProprietarioFormData>({
    resolver: zodResolver(proprietarioSchema),
    defaultValues: {
      name: "",
      source: "",
      telephone: "",
      address: "",
      neighboor: "",
      city: "",
      state: "",
      email: "",
      observations: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: ProprietarioFormData) => {
    try {
      await onCreate(data);
      toast({
        title: "Proprietario criado com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
      });
    }
  };

  return (
    <DialogForm
      title="Novo proprietario"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo proprietario
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-3">
            <CustomFormField
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Nome do Proprieatrio"
            />
            <TelephoneFormField control={form.control} name="telephone" />
          </div>
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />
          <div className="flex gap-3">
            <CustomFormField
              control={form.control}
              name="address"
              label="Logradouro"
              placeholder="Logradouro"
            />
            <CustomFormField
              control={form.control}
              name="neighboor"
              label="Bairro"
              placeholder="Bairro"
            />
          </div>
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
          <CustomFormField
            control={form.control}
            name="source"
            label="Fonte"
            placeholder="Fonte"
          />
          <CustomFormField
            control={form.control}
            name="observations"
            label="Observações"
            placeholder="Observações"
          />
          <DialogFooter>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
