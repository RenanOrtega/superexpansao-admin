import { contatoService } from "@/services/contatoService";
import { contatoSchema } from "@/types/Contato";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { LoadingButton } from "../LoadingButton";
import Container from "../Container";
import LoadingPage from "../LoadingPage";
import { CustomFormField } from "../CustomFormField";
import TelephoneFormField from "../TelephoneFormField";
import { Abordagem, AbordagemFormData } from "@/types/Abordagem";
import { AbordagemCreateDialog } from "../Abordagem/AbordagemCreateDialog";
import { abordagemService } from "@/services/abordagemService";

export function ContatoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abordagens, setAbordagens] = useState<Abordagem[]>([]);
  const [contatoId, setContatoId] = useState<string>("");

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
        setContatoId(response.id);
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

  const handleAddAbordagem = async (
    data: AbordagemFormData,
    contatoId: string
  ) => {
    try {
      var abordagemCreated = await abordagemService.create(data, contatoId);
      setAbordagens((prevAbordagem) => [...prevAbordagem, abordagemCreated]);
    } catch (error) {
      console.log("DEU ERRO:" + error);
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Abordagens</h2>
            <AbordagemCreateDialog
              onCreate={handleAddAbordagem}
              contatoId={contatoId}
            />
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Tipo de Abordagem</th>
                <th className="border p-2 text-left">Comentário</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Telefone</th>
                <th className="border p-2 text-center">Contatado</th>
                <th className="border p-2 text-left">Última Abordagem</th>
                <th className="border p-2 text-left">Próxima Abordagem</th>
              </tr>
            </thead>
            <tbody>
              {abordagens.map((abordagem) => (
                <tr
                  key={abordagem.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => console.log(abordagem.id)}
                >
                  <td className="border p-2">{abordagem.approachType}</td>
                  <td className="border p-2">{abordagem.comment}</td>
                  <td className="border p-2">{abordagem.status}</td>
                  <td className="border p-2">{abordagem.telephone}</td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={abordagem.contactAddressed}
                      readOnly
                      className="form-checkbox"
                    />
                  </td>
                  <td className="border p-2">
                    {abordagem.lastApproachDate
                      ? new Date(abordagem.lastApproachDate).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </td>
                  <td className="border p-2">
                    {abordagem.nextApproachDate
                      ? new Date(abordagem.nextApproachDate).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {abordagens.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              Nenhuma abordagem cadastrada
            </div>
          )}
        </Container>
      </div>
    </LoadingPage>
  );
}
