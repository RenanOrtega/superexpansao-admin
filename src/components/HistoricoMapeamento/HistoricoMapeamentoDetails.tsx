import { historicoMapeamentoService } from "@/services/historicoMapeamentoService";
import { historicoMapeamentoSchema } from "@/types/HistoricoMapeamento";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { LoadingButton } from "../LoadingButton";
import Container from "../Container";
import LoadingPage from "../LoadingPage";
import { CustomFormField } from "../CustomFormField";
import { useToast } from "@/hooks/use-toast";
import { DateFormField } from "../DateFormFields";
import { RoleBasedAccess } from "../RoleBasedAccess";

export function HistoricoMapeamentoDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof historicoMapeamentoSchema>>({
    resolver: zodResolver(historicoMapeamentoSchema),
    defaultValues: {
      cameraType: "",
      mappingDate: undefined,
      routeLink: "",
      value: undefined,
    },
  });

  useEffect(() => {
    const fetchHistoricoMapeamento = async () => {
      try {
        setIsLoading(true);
        const response = await historicoMapeamentoService.getById(id);
        form.reset({
          cameraType: response.cameraType,
          mappingDate: response.mappingDate,
          routeLink: response.routeLink,
          value: response.value,
        });
        setIsLoading(false);
      } catch (error) {
        navigate("/mapeadores");
      }
    };

    if (id) {
      fetchHistoricoMapeamento();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof historicoMapeamentoSchema>) => {
    setIsButtonLoading(true);
    try {
      await historicoMapeamentoService.update(id!, { ...data, id });
      toast({
        title: "Mapeamento atualizado com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      setIsButtonLoading(false);
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
      });
    }
  };

  return (
    <LoadingPage isLoading={isLoading}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Mapeador
          </Button>
          <RoleBasedAccess allowedRoles={["Admin", "Moderador"]}>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              {isEditing ? "Desabilitar edição" : "Habilitar edição"}
            </Button>
          </RoleBasedAccess>
        </div>
        <Container className="mb-5">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DateFormField
                  control={form.control}
                  label="Data mapeamento"
                  name="mappingDate"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="cameraType"
                  label="Tipo de camera"
                  placeholder="Tipo de camera"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="routeLink"
                  label="Link da rota"
                  placeholder="Link da rota"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="value"
                  label="Valor"
                  placeholder="Valor"
                  type="number"
                  disabled={!isEditing}
                />
              </div>

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
