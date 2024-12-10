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
import Container from "../Container";
import { DateFormField } from "../DateFormFields";
import LoadingPage from "../LoadingPage";
import { LoadingButton } from "../LoadingButton";
import { useToast } from "@/hooks/use-toast";

export function MapeadorDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

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
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Algo deu errado.",
        });
        navigate("/mapeadores");
      }
    };

    if (id) {
      fetchMapeador();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof mapeadorSchema>) => {
    try {
      setIsButtonLoading(true);
      await mapeadorService.update(id!, { ...data, id });
      toast({
        title: "Mapeador atualizado com sucesso.",
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
      <div className="container mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate("/mapeadores")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Mapeadores
        </Button>
        <Container>
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
              <DateFormField
                control={form.control}
                label="Último mapeamento"
                name="lastMapping"
              />
              <CustomFormField
                control={form.control}
                name="observations"
                label="Observações"
                placeholder="Observações"
              />
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
        </Container>
      </div>
    </LoadingPage>
  );
}
