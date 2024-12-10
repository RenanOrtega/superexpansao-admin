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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-500 dark:hover:bg-purple-700 dark:text-white"
                  isLoading={isButtonLoading}
                >
                  <Save size={16} /> Salvar
                </LoadingButton>
              </div>
            </form>
          </Form>
        </Container>

        <Container className="mt-5">
          <div className="flex gap-2 flex-col md:flex-row md:justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Abordagens</h2>
            <AbordagemCreateDialog
              onCreate={handleAddAbordagem}
              contatoId={contatoId}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Abordagem</TableHead>
                <TableHead>Comentário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-center">Contatado</TableHead>
                <TableHead className="text-center">Última Abordagem</TableHead>
                <TableHead className="text-center">Próxima Abordagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {abordagens.map((abordagem) => (
                <TableRow
                  key={abordagem.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => console.log(abordagem.id)}
                >
                  <TableCell>{abordagem.approachType}</TableCell>
                  <TableCell>{abordagem.comment}</TableCell>
                  <TableCell>{abordagem.status}</TableCell>
                  <TableCell>{abordagem.telephone}</TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={abordagem.contactAddressed}
                      readOnly
                      className="form-checkbox"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {abordagem.lastApproachDate
                      ? new Date(abordagem.lastApproachDate).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {abordagem.nextApproachDate
                      ? new Date(abordagem.nextApproachDate).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
