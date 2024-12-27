import { useToast } from "@/hooks/use-toast";
import { abordagemService } from "@/services/abordagemService";
import { abordagemSchema } from "@/types/Abordagem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import LoadingPage from "../LoadingPage";
import { Button } from "../ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";
import Container from "../Container";
import { LoadingButton } from "../LoadingButton";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";
import { DateFormField } from "../DateFormFields";
import { Form, FormField } from "../ui/form";
import { UserCombobox } from "../User/UserCombobox";
import SelectFormField from "../SelectFormField";

export default function AbordagemDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof abordagemSchema>>({
    resolver: zodResolver(abordagemSchema),
    defaultValues: {
      approachType: "",
      comment: "",
      contactAddressed: false,
      status: "",
      telephone: "",
      lastApproachDate: undefined,
      nextApproachDate: undefined,
    },
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        setIsLoading(true);
        const response = await abordagemService.getById(id);
        form.reset({
          approachType: response.approachType,
          comment: response.comment,
          status: response.status,
          telephone: response.telephone,
          contactAddressed: response.contactAddressed,
          lastApproachDate: response.lastApproachDate,
          nextApproachDate: response.nextApproachDate,
          userEmail: response.userEmail,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar abordagem:", error);
        navigate(-1);
      }
    };

    if (id) {
      fetchEmpresa();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof abordagemSchema>) => {
    setIsButtonLoading(true);
    try {
      await abordagemService.update(id!, { ...data, id });
      toast({
        title: "Abordagem atualizada com sucesso.",
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
            <ArrowLeft size={16} /> Voltar
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
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="approachType"
                  label="Tipo da abordagem"
                  placeholder="Tipo da abordagem"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="comment"
                  label="Comentario"
                  placeholder="Comentario"
                  disabled={!isEditing}
                />
                <DateFormField
                  control={form.control}
                  label="Última abordagem"
                  name="lastApproachDate"
                  disabled={!isEditing}
                />
                <DateFormField
                  control={form.control}
                  label="Próxima abordagem"
                  name="nextApproachDate"
                  disabled={!isEditing}
                />
                <TelephoneFormField
                  control={form.control}
                  name="telephone"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Status"
                  disabled={!isEditing}
                />
                <SelectFormField
                  control={form.control}
                  label="Contato abordado"
                  name="contactAddressed"
                  placeholder="Selecione"
                  values={[true, false]}
                  labels={["Sim", "Não"]}
                  disabled={!isEditing}
                />
                <FormField
                  control={form.control}
                  name="userEmail"
                  render={({ field: { value, onChange } }) => (
                    <UserCombobox
                      value={value}
                      onChange={onChange}
                      disabled={!isEditing}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end">
                <LoadingButton
                  type="submit"
                  variant="default"
                  className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-500 dark:hover:bg-purple-700 dark:text-white"
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
