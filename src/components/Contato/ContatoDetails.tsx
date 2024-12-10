import { contatoService } from "@/services/contatoService";
import { contatoSchema } from "@/types/Contato";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { LoadingButton } from "../LoadingButton";
import Container from "../Container";
import LoadingPage from "../LoadingPage";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";
import { Abordagem } from "@/types/Abordagem";

export function ContatoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abordagens, setAbordagens] = useState<Abordagem[]>([]);

  const form = useForm<z.infer<typeof contatoSchema>>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      email: "",
      name: "",
      position: "",
      telephone: "",
    },
  });

  useEffect(() => {
    const fetchContato = async () => {
      try {
        setIsLoading(true);
        const response = await contatoService.getById(id);
        form.reset({
          email: response.email,
          name: response.name,
          position: response.position,
          telephone: response.telephone,
        });
        setAbordagens(response.abordagens);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
        navigate("/contatos");
      }
    };

    if (id) {
      fetchContato();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof contatoSchema>) => {
    setIsButtonLoading(true);
    try {
      await contatoService.update(id!, { ...data, id });
      setIsButtonLoading(false);
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
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
          <ArrowLeft size={16} /> Empresa
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Nome"
                  placeholder="Nome"
                />
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
                <TelephoneFormField control={form.control} name="telephone" />
                <CustomFormField
                  control={form.control}
                  name="position"
                  label="Cargo"
                  placeholder="Cargo"
                />
              </div>

              <div className="flex justify-end">
                <LoadingButton
                  type="submit"
                  variant="default"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  isLoading={isButtonLoading}
                >
                  <Save size={16} /> Salvar
                </LoadingButton>
              </div>
            </form>
          </Form>
        </Container>

        <Container className="mt-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Abordagem</h2>
            {/* <ContatoCreateDialog
              onCreate={handleAddContato}
              contatoId={contatoId}
            /> */}
          </div>
        </Container>
        <div className="grid grid-cols-1 gap-2 mt-5">
          {abordagens.map((abordagem) => {
            return (
              <div
                onClick={() => {
                  console.log(abordagem.id);
                }}
              >
                <Container className="cursor-pointer hover:border-blue-700 hover:border-x-8">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-semibold truncate">
                      {abordagem.lastApproachDate.toString()}
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
      </div>
    </LoadingPage>
  );
}
