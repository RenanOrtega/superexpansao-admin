"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateHistoricoMapeamentoDialogProps,
  HistoricoMapeamentoFormData,
  historicoMapeamentoSchema,
} from "@/types/HistoricoMapeamento";
import { DialogFooter } from "../ui/dialog";
import { CustomFormField } from "../CustomFormField";
import { DateFormField } from "../DateFormFields";

export function HistoricoMapeamentoCreateDialog({
  onCreate,
  mapeadorId,
}: CreateHistoricoMapeamentoDialogProps) {
  const form = useForm<HistoricoMapeamentoFormData>({
    resolver: zodResolver(historicoMapeamentoSchema),
    defaultValues: {
      cameraType: "",
      mappingDate: undefined,
      routeLink: "",
      value: undefined,
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: HistoricoMapeamentoFormData) => {
    try {
      await onCreate(data, mapeadorId);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {}
  };

  return (
    <DialogForm
      title="Registrar mapeamento"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Registrar mapeamento
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DateFormField
              control={form.control}
              label="Data mapeamento"
              name="mappingDate"
            />
            <CustomFormField
              control={form.control}
              label="Tipo de camera"
              name="cameraType"
              placeholder="Tipo de camera"
            />
            <CustomFormField
              control={form.control}
              label="Link da rota"
              name="routeLink"
              placeholder="Link da rota"
            />
            <CustomFormField
              control={form.control}
              label="Valor"
              name="value"
              placeholder="Valor"
              type="number"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
