"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { Form } from "../ui/form";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import { DialogFooter } from "../ui/dialog";
import {
  AbordagemFormData,
  abordagemSchema,
  CreateAbordagemDialogProps,
} from "@/types/Abordagem";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";
import SelectFormField from "../SelectFormField";
import { DateFormField } from "../DateFormFields";
import { LoadingButton } from "../LoadingButton";

export function AbordagemCreateDialog({
  onCreate,
  contatoId,
}: CreateAbordagemDialogProps) {
  const form = useForm<AbordagemFormData>({
    resolver: zodResolver(abordagemSchema),
    defaultValues: {
      approachType: "",
      comment: "",
      status: "",
      telephone: "",
      contactAddressed: false,
      lastApproachDate: undefined,
      nextApproachDate: undefined,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: AbordagemFormData) => {
    try {
      setIsLoading(true);
      await onCreate(data, contatoId);
      form.reset();
      setIsLoading(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogForm
      title="Nova abordagem"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Nova abordagem
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <TelephoneFormField control={form.control} name="telephone" />
            <CustomFormField
              control={form.control}
              label="Status"
              name="status"
              placeholder="Status"
            />
            <CustomFormField
              control={form.control}
              label="Comentario"
              name="comment"
              placeholder="Comentario"
            />
            <SelectFormField
              control={form.control}
              label="Contato abordado?"
              name="contactAddressed"
              placeholder="Selecione"
              values={[true, false]}
              labels={["Sim", "Não"]}
            />
          </div>
          <CustomFormField
            control={form.control}
            label="Tipo de abordagem"
            name="approachType"
            placeholder="Tipo de abordagem"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DateFormField
              control={form.control}
              label="Última abordagem"
              name="lastApproachDate"
            />
            <DateFormField
              control={form.control}
              label="Próxima abordagem"
              name="nextApproachDate"
            />
          </div>
          <DialogFooter>
            <LoadingButton isLoading={isLoading}>
              <Save className="mr-2 h-4 w-4" /> Criar
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
