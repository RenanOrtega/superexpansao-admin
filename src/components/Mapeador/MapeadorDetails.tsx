import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { mapeadorSchema } from "@/types/Mapeador";
import { mapeadorService } from "@/services/mapeadorService";
import TelephoneFormField from "../TelephoneFormField";
import SelectFormField from "../SelectFormField";

export function MapeadorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  useState(false);

  const form = useForm<z.infer<typeof mapeadorSchema>>({
    resolver: zodResolver(mapeadorSchema),
    defaultValues: {
      city: "",
      name: "",
      observations: "",
      pix: "",
      telephone: "",
      vehicle: "",
      lastMapping: undefined,
    },
  });

  useEffect(() => {
    const fetchMapeador = async () => {
      if (!id) return;
      try {
        const response = await mapeadorService.getById(id);
        console.log(response);
        form.reset({
          city: response.city,
          lastMapping: response.lastMapping,
          name: response.name,
          observations: response.observations,
          pix: response.pix,
          telephone: response.telephone,
          vehicle: response.vehicle,
        });
      } catch (error) {
        console.error("Erro ao buscar mapeador:", error);
        navigate("/mapeadores");
      }
    };

    if (id) {
      fetchMapeador();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof mapeadorSchema>) => {
    try {
      await mapeadorService.update(id!, { ...data, id });
    } catch (error) {
      console.error("Erro ao salvar mapeador:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Button
        variant="outline"
        onClick={() => navigate("/mapeadores")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Mapeadores
      </Button>
      <div className=" bg-white shadow-lg rounded p-5">
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <SelectFormField
                control={form.control}
                label="Veículo"
                name="vehicle"
                placeholder="Selecione um veículo"
                values={["Moto", "Carro"]}
              />
              <CustomFormField
                control={form.control}
                name="pix"
                label="PIX"
                placeholder="Chave PIX"
              />
            </div>
            {/* <FormField
            control={form.control}
            name="lastMapping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Último Mapeamento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "dd/MM/yyyy")
                          : "Selecione uma data"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}
            <CustomFormField
              control={form.control}
              name="observations"
              label="Observações"
              placeholder="Observações"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save size={16} /> Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
