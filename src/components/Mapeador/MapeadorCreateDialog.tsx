"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import {
  CreateMapeadorDialogProps,
  MapeadorFormData,
  mapeadorSchema,
} from "@/types/Mapeador";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import { CustomFormField } from "../CustomFormField";
import { DialogFooter } from "../ui/dialog";
import TelephoneFormField from "../TelephoneFormField";
import SelectFormField from "../SelectFormField";
import { DateFormField } from "../DateFormFields";
import { useToast } from "@/hooks/use-toast";

export function MapeadorCreateDialog({ onCreate }: CreateMapeadorDialogProps) {
  const { toast } = useToast();

  const form = useForm<MapeadorFormData>({
    resolver: zodResolver(mapeadorSchema),
    defaultValues: {
      name: "",
      telephone: "",
      city: "",
      vehicle: "",
      pix: "",
      observations: "",
      lastMapping: undefined,
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: MapeadorFormData) => {
    try {
      await onCreate(data);
      toast({
        title: "Mapeador criado com sucesso.",
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

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <DialogForm
      title="Novo mapeador"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo mapeador
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <CustomFormField
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Nome do Mapeador"
            />
            <TelephoneFormField control={form.control} name="telephone" />
          </div>

          <CustomFormField
            control={form.control}
            name="city"
            label="Cidade"
            placeholder="Cidade"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <SelectFormField
              control={form.control}
              label="Veículo"
              name="vehicle"
              placeholder="Seleciona um veículo"
              values={["Moto", "Carro"]}
              labels={["Moto", "Carro"]}
            />
            <CustomFormField
              control={form.control}
              name="pix"
              label="PIX"
              placeholder="Chave PIX"
            />
          </div>
          <DateFormField
            control={form.control}
            label="Último mapeamento"
            name="lastMapping"
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
