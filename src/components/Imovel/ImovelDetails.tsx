import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { imovelSchema, ImovelWithProprietario } from "@/types/Imovel";
import { imovelService } from "@/services/imovelService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { ProprietarioCombobox } from "../Proprietario/ProprietarioCombobox";
import SelectFormField from "../SelectFormField";
import Container from "../Container";
import LoadingPage from "../LoadingPage";
import { LoadingButton } from "../LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/types/Address";
import CepAutocomplete from "../CepAutocomplete";

export function ImovelDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState<ImovelWithProprietario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof imovelSchema>>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      address: "",
      availability: "",
      city: "",
      iptuMonthly: 0,
      iptuAnnual: 0,
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
      cep: "",
    },
  });

  useEffect(() => {
    const fetchImovel = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await imovelService.getById(id);

        form.reset({
          address: response.address,
          availability: response.availability,
          city: response.city,
          iptuMonthly: response.iptuMonthly,
          iptuAnnual: response.iptuAnnual,
          link: response.link,
          neighborhood: response.neighborhood,
          propertyProfile: response.propertyProfile,
          proprietarioId: response.proprietarioId,
          realEstate: response.realEstate,
          rentValue: response.rentValue,
          saleValue: response.saleValue,
          searchMeterage: response.searchMeterage,
          state: response.state,
          totalArea: response.totalArea,
          zone: response.zone,
          cep: response.cep,
        });

        setImovel(response);
        setIsLoading(false);
        setIsEditing(false);
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
      setIsButtonLoading(true);
      await imovelService.update(id!, { ...data, id });
      toast({
        title: "Imove atualizado com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      setIsButtonLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
      });
    }
  };

  const handleAddressChange = (address: Address) => {
    form.setValue("address", address.logradouro);
    form.setValue("neighborhood", address.bairro);
    form.setValue("city", address.cidade);
    form.setValue("state", address.uf);
    form.setValue("cep", address.cep);
    form.setValue("zone", address.regiao);
  };

  return (
    <LoadingPage isLoading={isLoading}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
          <Button
            variant="outline"
            onClick={() => navigate("/imoveis")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Imóveis
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            {isEditing ? "Desabilitar edição" : "Habilitar edição"}
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col md:flex-row gap-5">
              <Container className="flex-1">
                <h2 className="font-bold mb-4 text-lg">Localização</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="w-full">
                    <CepAutocomplete
                      control={form.control}
                      name="cep"
                      onAddressChange={handleAddressChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <CustomFormField
                    control={form.control}
                    name="address"
                    label="Logradouro"
                    placeholder="Logradouro do Imóvel"
                    className="mb-3"
                    disabled={!isEditing}
                    readOnly
                  />
                  <CustomFormField
                    control={form.control}
                    name="city"
                    label="Cidade"
                    placeholder="Cidade"
                    disabled={!isEditing}
                    readOnly
                  />
                  <CustomFormField
                    control={form.control}
                    name="state"
                    label="Estado"
                    placeholder="Estado"
                    disabled={!isEditing}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    control={form.control}
                    name="neighborhood"
                    label="Bairro"
                    placeholder="Bairro"
                    disabled={!isEditing}
                    readOnly
                  />
                  <CustomFormField
                    control={form.control}
                    name="zone"
                    label="Zona"
                    placeholder="Zona"
                    disabled={!isEditing}
                    readOnly
                  />
                </div>
              </Container>
              <Container className="flex flex-col">
                <h2 className="font-bold mb-4 text-lg">Proprietario</h2>
                <div className="flex-grow flex flex-col">
                  <span className="block">{imovel?.proprietario.name}</span>
                  <span className="block">
                    {imovel?.proprietario.telephone}
                  </span>
                  <span className="block">{imovel?.proprietario.email}</span>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate(`/proprietarios/${imovel?.proprietarioId}`);
                    }}
                  >
                    Acessar proprietario
                  </Button>
                </div>
              </Container>
            </div>
            <Container>
              <h2 className="font-bold mb-4 text-lg">Detalhes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <FormField
                  control={form.control}
                  name="proprietarioId"
                  render={({ field: { value, onChange } }) => (
                    <ProprietarioCombobox
                      value={value}
                      onChange={onChange}
                      disabled={!isEditing}
                    />
                  )}
                />
                <SelectFormField
                  control={form.control}
                  name="availability"
                  label="Disponibilidade"
                  placeholder="Seleciona a disponibilidade"
                  values={["Disponivel", "Alugado", "Indisponivel", "Motivo"]}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <CustomFormField
                  control={form.control}
                  name="link"
                  label="Link"
                  placeholder="Link"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="propertyProfile"
                  label="Perfil"
                  placeholder="Perfil do Imóvel"
                  disabled={!isEditing}
                />
              </div>
              <CustomFormField
                control={form.control}
                name="realEstate"
                label="Imobiliária"
                placeholder="Imobiliária"
                disabled={!isEditing}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <CustomFormField
                  control={form.control}
                  name="searchMeterage"
                  label="Metragem de busca - m2"
                  type="number"
                  placeholder="Metragem"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="totalArea"
                  label="Total da área - m2"
                  type="number"
                  placeholder="Total da área"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
              </div>
            </Container>
            <Container>
              <h2 className="font-bold mb-4 text-lg">Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <CustomFormField
                  control={form.control}
                  name="iptuMonthly"
                  label="Valor do IPTU mensal"
                  type="number"
                  placeholder="IPTU mensal"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="iptuAnnual"
                  label="Valor do IPTU anual"
                  type="number"
                  placeholder="IPTU anual"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="rentValue"
                  label="Valor do Aluguel"
                  type="number"
                  placeholder="Valor do Aluguel"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="saleValue"
                  label="Valor de Venda"
                  type="number"
                  placeholder="Valor de Venda"
                  onChange={(value) =>
                    value === "" ? undefined : Number(value)
                  }
                  disabled={!isEditing}
                />
              </div>
            </Container>
            <div className="flex justify-end">
              <LoadingButton
                type="submit"
                variant="default"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-500 dark:hover:bg-purple-700 dark:text-white"
                isLoading={isButtonLoading}
              >
                <Save size={16} /> Salvar
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </LoadingPage>
  );
}
