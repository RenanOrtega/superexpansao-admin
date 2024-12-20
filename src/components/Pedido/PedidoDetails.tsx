import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { pedidoUpdateSchema } from "@/types/Pedido";
import { pedidoService } from "@/services/pedidoService";
import Container from "../Container";
import { DateFormField } from "../DateFormFields";
import SelectFormField from "../SelectFormField";
import LoadingPage from "../LoadingPage";
import { LoadingButton } from "../LoadingButton";
import { useToast } from "@/hooks/use-toast";

export function PedidoDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof pedidoUpdateSchema>>({
    resolver: zodResolver(pedidoUpdateSchema),
    defaultValues: {
      builtArea: 0,
      city: "",
      coordinator: "",
      client: "",
      expander: "",
      observations: "",
      order: "",
      performer: "",
      propertyType: "",
      state: "",
      status: "",
      streetView: "",
      zeroPoint: "",
      propertyValue: "",
      entryDate: undefined,
      deliveryDate: undefined,
      mappingCompleted: undefined,
      onlineDate: undefined,
      streetViewDate: undefined,
      onlineCreated: false,
      maximumMeterage: 0,
      minimumMeterage: 0,
      parkingSpaces: 0,
      totalArea: 0,
    },
  });

  useEffect(() => {
    const fetchPedido = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await pedidoService.getById(id);
        console.log(response);
        form.reset({
          builtArea: response.builtArea,
          city: response.city,
          client: response.client,
          coordinator: response.coordinator,
          expander: response.expander,
          mappingCompleted: response.mappingCompleted,
          maximumMeterage: response.maximumMeterage,
          minimumMeterage: response.minimumMeterage,
          observations: response.observations,
          onlineCreated: response.onlineCreated,
          order: response.order,
          parkingSpaces: response.parkingSpaces,
          performer: response.performer,
          propertyType: response.propertyType,
          propertyValue: response.propertyValue,
          state: response.state,
          status: response.status,
          streetView: response.streetView,
          totalArea: response.totalArea,
          zeroPoint: response.zeroPoint,
          entryDate: response.entryDate
            ? new Date(response.entryDate)
            : undefined,
          deliveryDate: response.deliveryDate
            ? new Date(response.deliveryDate)
            : undefined,
          onlineDate: response.onlineDate
            ? new Date(response.onlineDate)
            : undefined,
          streetViewDate: response.streetViewDate
            ? new Date(response.streetViewDate)
            : undefined,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        navigate("/pedidos");
      }
    };

    if (id) {
      fetchPedido();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof pedidoUpdateSchema>) => {
    try {
      setIsButtonLoading(true);
      await pedidoService.update(id!, { ...data, id });
      toast({
        title: "Pedido criado com sucesso.",
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

  return (
    <LoadingPage isLoading={isLoading}>
      <Button
        variant="outline"
        onClick={() => navigate("/pedidos")}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Pedidos
      </Button>
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
          <Container>
            <h2 className="mb-5 font-semibold">Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <CustomFormField
                control={form.control}
                name="coordinator"
                label="Coordenador"
                placeholder="Coordenador"
              />
              <CustomFormField
                control={form.control}
                name="performer"
                label="Responsavel"
                placeholder="Responsavel"
              />
              <CustomFormField
                control={form.control}
                name="expander"
                label="Expansor"
                placeholder="Expansor"
              />
            </div>
          </Container>
          <Container>
            <h2 className="mb-5 font-semibold">Detalhes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <DateFormField
                control={form.control}
                label="Data de entrada"
                name="entryDate"
              />
              <DateFormField
                control={form.control}
                label="Data de entrega"
                name="deliveryDate"
              />
              <CustomFormField
                control={form.control}
                name="client"
                label="Cliente"
                placeholder="Cliente"
              />
              <CustomFormField
                control={form.control}
                name="order"
                label="Pedido"
                placeholder="Pedido"
              />
              <CustomFormField
                control={form.control}
                name="propertyType"
                label="Tipo do imóvel"
                placeholder="Tipo do imóvel"
              />
              <CustomFormField
                control={form.control}
                name="parkingSpaces"
                label="Quantidade de vagas"
                placeholder="Quantidade de vagas"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="status"
                label="Status"
                placeholder="Status"
              />{" "}
              <CustomFormField
                control={form.control}
                name="zeroPoint"
                label="Ponto zero"
                placeholder="Ponto zero"
              />
              <CustomFormField
                control={form.control}
                name="propertyValue"
                label="Vulgo do imóvel"
                placeholder="Vulgo do imóvel"
              />
              <CustomFormField
                control={form.control}
                name="observations"
                label="Observações"
                placeholder="Observações"
              />
              <SelectFormField
                control={form.control}
                label="Online criado"
                name="onlineCreated"
                placeholder="Selecione"
                values={[true, false]}
                labels={["Sim", "Não"]}
              />
              <DateFormField
                control={form.control}
                label="Data online"
                name="onlineDate"
              />
            </div>
          </Container>
          <Container>
            <h2 className="mb-5 font-semibold">Local</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                name="streetView"
                label="StreetView"
                placeholder="StreetView"
              />
              <DateFormField
                control={form.control}
                label="Data do StreetView"
                name="streetViewDate"
              />
              <SelectFormField
                control={form.control}
                label="Mapeamento completo"
                name="mappingCompleted"
                placeholder="Selecione"
                values={[true, false]}
                labels={["Sim", "Não"]}
              />
            </div>
          </Container>
          <Container>
            <h2 className="mb-5 font-semibold">Metragens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CustomFormField
                control={form.control}
                name="minimumMeterage"
                label="Metragem mín"
                placeholder="Metragem mín"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="maximumMeterage"
                label="Metragem máx"
                placeholder="Metragem máx"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="totalArea"
                label="Area total"
                placeholder="Area total"
                type="number"
              />
              <CustomFormField
                control={form.control}
                name="builtArea"
                label="Area construida"
                placeholder="Area construida"
                type="number"
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
    </LoadingPage>
  );
}
