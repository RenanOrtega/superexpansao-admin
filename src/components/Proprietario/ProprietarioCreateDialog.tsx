"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import InputMask from "react-input-mask";
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateProprietarioDialogProps,
  ProprietarioFormData,
  proprietarioSchema,
} from "@/types/Proprietario";
import { CustomFormField } from "../CustomFormField";

export function ProprietarioCreateDialog({
  onCreate,
}: CreateProprietarioDialogProps) {
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

  const onSubmit = async (data: ProprietarioFormData) => {
    try {
      await onCreate(data);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogForm
      title="Novo proprietario"
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo proprietario
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            control={form.control}
            name="name"
            label="Nome"
            placeholder="Nome do Proprieatrio"
          />
          <CustomFormField
            control={form.control}
            name="source"
            label="Fonte"
            placeholder="Fonte"
          />
          {/* Telephone */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar="_"
                    placeholder="(00) 00000-0000"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => <Input {...inputProps} />}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomFormField
            control={form.control}
            name="address"
            label="Endereço"
            placeholder="Endereço"
          />
          <CustomFormField
            control={form.control}
            name="neighboor"
            label="Bairro"
            placeholder="Bairro"
          />
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
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />
          <CustomFormField
            control={form.control}
            name="observations"
            label="Observações"
            placeholder="Observações"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </DialogForm>
  );
}
