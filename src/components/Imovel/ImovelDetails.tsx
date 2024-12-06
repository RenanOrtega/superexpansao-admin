import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { imovelSchema } from "@/types/Imovel";
import { imovelService } from "@/services/imovelService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { ProprietarioCombobox } from "../Proprietario/ProprietarioCombobox";

export function ImovelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  useState(false);

  const form = useForm<z.infer<typeof imovelSchema>>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      address: "",
      availability: "",
      city: "",
      iptuValue: 0,
      link: "",
      neighborhood: "",
      propertyProfile: "",
      proprietarioId: "",
      realEstate: "",
      rentValue: 0,
      saleValue: 0,
      searchMeterage: 0,
      state: "",
      totalArea: 0,
      zone: "",
    },
  });

  useEffect(() => {
    const fetchImovel = async () => {
      if (!id) return;
      try {
        const response = await imovelService.getById(id);

        form.reset({
          address: response.address,
          availability: response.availability,
          city: response.city,
          iptuValue: response.iptuValue,
          link: response.link,
          neighborhood: response.neighboorhoud,
          propertyProfile: response.propertyProfile,
          proprietarioId: response.proprietarioId,
          realEstate: response.realEstate,
          rentValue: response.rentValue,
          saleValue: response.saleValue,
          searchMeterage: response.searchMeterage,
          state: response.state,
          totalArea: response.totalArea,
          zone: response.zone,
        });
      } catch (error) {
        console.error("Erro ao buscar imovel:", error);
        navigate("/imoveis");
      }
    };

    if (id) {
      fetchImovel();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof imovelSchema>) => {
    try {
      await imovelService.update(id!, { ...data, id });
    } catch (error) {
      console.error("Erro ao salvar imovel:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        onClick={() => navigate("/imoveis")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Imóveis
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white shadow-lg rounded p-5">
            <h2 className="font-bold mb-4 text-lg">Localização</h2>
            <CustomFormField
              control={form.control}
              name="address"
              label="Endereço"
              placeholder="Endereço do Imóvel"
              className="mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                name="neighborhood"
                label="Bairro"
                placeholder="Bairro"
              />
              <CustomFormField
                control={form.control}
                name="zone"
                label="Zona"
                placeholder="Zona"
              />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded p-5">
            <h2 className="font-bold mb-4 text-lg">Detalhes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <FormField
                control={form.control}
                name="proprietarioId"
                render={({ field }) => <ProprietarioCombobox field={field} />}
              />
              <CustomFormField
                control={form.control}
                name="availability"
                label="Disponibilidade"
                placeholder="Disponibilidade"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <CustomFormField
                control={form.control}
                name="link"
                label="Link"
                placeholder="Link"
              />
              <CustomFormField
                control={form.control}
                name="propertyProfile"
                label="Perfil"
                placeholder="Perfil do Imóvel"
              />
            </div>
            <CustomFormField
              control={form.control}
              name="realEstate"
              label="Imobiliária"
              placeholder="Imobiliária"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <CustomFormField
                control={form.control}
                name="searchMeterage"
                label="Metragem de busca"
                type="number"
                placeholder="Metragem"
                onChange={(value) => (value === "" ? undefined : Number(value))}
              />
              <CustomFormField
                control={form.control}
                name="totalArea"
                label="Total da área"
                type="number"
                placeholder="Total da área"
                onChange={(value) => (value === "" ? undefined : Number(value))}
              />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded p-5">
            <h2 className="font-bold mb-4 text-lg">Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <CustomFormField
                control={form.control}
                name="iptuValue"
                label="Valor do IPTU"
                type="number"
                placeholder="IPTU"
                onChange={(value) => (value === "" ? undefined : Number(value))}
              />
              <CustomFormField
                control={form.control}
                name="rentValue"
                label="Valor do Aluguel"
                type="number"
                placeholder="Valor do Aluguel"
                onChange={(value) => (value === "" ? undefined : Number(value))}
              />
              <CustomFormField
                control={form.control}
                name="saleValue"
                label="Valor de Venda"
                type="number"
                placeholder="Valor de Venda"
                onChange={(value) => (value === "" ? undefined : Number(value))}
              />
            </div>
          </div>

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
  );
}
