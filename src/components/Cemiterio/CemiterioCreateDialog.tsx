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
  CreateCemiterioDialogProps,
  CemiterioFormData,
  cemiterioSchema,
} from "@/types/Cemiterio";

export function CemiterioCreateDialog({
  onCreate,
}: CreateCemiterioDialogProps) {
  const form = useForm<CemiterioFormData>({
    resolver: zodResolver(cemiterioSchema),
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

  const onSubmit = async (data: CemiterioFormData) => {
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
      title="Novo imóvel"
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo imóvel
        </Button>
      }
    >
      <h2>Em manutenção.</h2>
    </DialogForm>
  );
}
