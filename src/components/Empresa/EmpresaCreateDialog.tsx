"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateEmpresaDialogProps,
  EmpresaFormData,
  empresaSchema,
} from "@/types/Empresa";
import { DialogFooter } from "../ui/dialog";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";

export function EmpresaCreateDialog({ onCreate }: CreateEmpresaDialogProps) {
  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {},
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: EmpresaFormData) => {
    try {
      await onCreate(data);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {}
  };

  return (
    <DialogForm
      title="Novo cliente"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo cliente
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <CustomFormField
              control={form.control}
              label="Nome fantasia"
              name="fantasyName"
              placeholder="Nome fantasia"
            />
            <CustomFormField
              control={form.control}
              label="Razão social"
              name="socialReason"
              placeholder="Razão social"
            />
          </div>
          <CustomFormField
            control={form.control}
            label="Categoria"
            name="category"
            placeholder="Categoria"
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
