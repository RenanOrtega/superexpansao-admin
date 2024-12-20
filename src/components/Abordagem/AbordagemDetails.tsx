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
import { ArrowLeft, Save } from "lucide-react";
import Container from "../Container";
import { LoadingButton } from "../LoadingButton";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";
import { DateFormField } from "../DateFormFields";
import { Form } from "../ui/form";
import { CustomCheckboxField } from "../CheckboxFormField";

export default function AbordagemDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Empresas
        </Button>

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
                <CustomFormField
                  control={form.control}
                  name="approachType"
                  label="Tipo da abordagem"
                  placeholder="Tipo da abordagem"
                />
                <CustomFormField
                  control={form.control}
                  name="comment"
                  label="Comentario"
                  placeholder="Comentario"
                />
                <DateFormField
                  control={form.control}
                  label="Última abordagem"
                  name="lastApproachDate"
                />
                <DateFormField
                  control={form.control}
                  label="Próxima abordagem"
                  name="nextApproachDate"
                />
                <TelephoneFormField control={form.control} name="telephone" />
                <CustomFormField
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Status"
                />
                <div className="pt-5 pl-2">
                  <CustomCheckboxField
                    control={form.control}
                    name="contactAddressed"
                    label="Contato abordado"
                  />
                </div>
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
