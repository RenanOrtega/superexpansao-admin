"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
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
import { LoadingButton } from "../LoadingButton";

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
      city: "",
      state: "",
      areaOfActivity: "",
      observations: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: ContatoFormData) => {
    try {
      setIsButtonLoading(true);
      await onCreate(data, empresaId);
      form.reset();
      setIsButtonLoading(false);
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
            <CustomFormField
              control={form.control}
              label="Cidade"
              name="city"
              placeholder="Cidade"
            />
            <CustomFormField
              control={form.control}
              label="Estado"
              name="state"
              placeholder="Estado"
            />
          </div>
          <TelephoneFormField control={form.control} name="telephone" />
          <CustomFormField
            control={form.control}
            label="Area de atuação"
            name="areaOfActivity"
            placeholder="Area de atuação"
          />
          <CustomFormField
            control={form.control}
            label="Email"
            name="email"
            placeholder="Email"
          />
          <CustomFormField
            control={form.control}
            label="Observações"
            name="observations"
            placeholder="Observações"
          />
          <DialogFooter>
            <LoadingButton isLoading={isButtonLoading}>
              <Save className="mr-2 h-4 w-4" /> Criar
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
