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
import { DialogForm } from "../DialogForm";
import { useState } from "react";
import {
  CreateImovelDialogProps,
  ImovelFormData,
  imovelSchema,
} from "@/types/Imovel";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ProprietarioCombobox } from "../Proprietario/ProprietarioComboBox";
import { proprietarioService } from "@/services/proprietarioService";

export function ImovelCreateDialog({ onCreate }: CreateImovelDialogProps) {
  const form = useForm<ImovelFormData>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      address: "",
      city: "",
      neighborhood: "",
      proprietarioId: "",
      zone: "",
      state: "",
      availability: "",
      link: "",
      propertyProfile: "",
      realEstate: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: ImovelFormData) => {
    console.log(data.saleValue);
    try {
      await onCreate(data);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProprietarios = async () => {
    const response = await proprietarioService.get({});
    return response.items;
  };

  return (
    <DialogForm
      title="Novo imóvel"
      open={isDialogOpen}
      onOpenChange={handleDialogChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo imóvel
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Tabs defaultValue="address">
            <TabsList className="flex justify-between mb-5">
              <TabsTrigger
                value="address"
                className="py-2 text-gray-700 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition duration-200"
                autoFocus
              >
                Endereço
              </TabsTrigger>
              <TabsTrigger
                value="property"
                className="py-2 text-gray-700 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition duration-200"
              >
                Propriedade
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="py-2 text-gray-700 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition duration-200"
              >
                Valores
              </TabsTrigger>
            </TabsList>
            <TabsContent value="address" className="flex flex-col gap-3">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço do Imóvel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3">
                {/* neighborhood */}
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Zona</FormLabel>
                      <FormControl>
                        <Input placeholder="Zona" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="property" className="flex flex-col gap-3">
              {/* proprietarioId */}
              <FormField
                name="proprietarioId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Proprietario</FormLabel>
                      <FormControl>
                        <ProprietarioCombobox
                          fetchProprietarios={fetchProprietarios}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* availability */}
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Disponibilidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Link */}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* propertyProfile */}
              <FormField
                control={form.control}
                name="propertyProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil</FormLabel>
                    <FormControl>
                      <Input placeholder="Perfil do Imóvel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* realEstate */}
              <FormField
                control={form.control}
                name="realEstate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imobiliaria</FormLabel>
                    <FormControl>
                      <Input placeholder="Imobiliaria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                {/* searchMeterage */}
                <FormField
                  control={form.control}
                  name="searchMeterage"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Metragem de busca</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Metragem"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* totalArea */}
                <FormField
                  control={form.control}
                  name="totalArea"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Total da area</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total da area"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="financial" className="flex flex-col gap-3">
              {/* iptuValue */}
              <FormField
                control={form.control}
                name="iptuValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do IPTU</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="IPTU"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* rentValue */}
              <FormField
                control={form.control}
                name="rentValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do aluguel</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Valor do Alguel"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* saleValue */}
              <FormField
                control={form.control}
                name="saleValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor de venda</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Valor de Venda"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </DialogForm>
  );
}
