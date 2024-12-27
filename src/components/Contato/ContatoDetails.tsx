import { contatoService } from "@/services/contatoService";
import { contatoSchema } from "@/types/Contato";
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
import { useToast } from "@/hooks/use-toast";
import AbordagemFilters from "../Abordagem/AbordagemFilters";
import { AbordagemFilterParams } from "@/types/Abordagem/filters";

export function ContatoDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contatoId, setContatoId] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const [filteredAbordagens, setFilteredAbordagens] = useState<Abordagem[]>([]);
  const [filters, setFilters] = useState<AbordagemFilterParams>({});

  const [abordagens, setAbordagens] = useState<Abordagem[]>([]);

  const form = useForm<z.infer<typeof contatoSchema>>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      email: "",
      name: "",
      position: "",
      telephone: "",
      city: "",
      state: "",
      areaOfActivity: "",
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
        setFilteredAbordagens(response.abordagens);
        setIsLoading(false);
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
        navigate("/contatos");
      }
    };

    if (id) {
      fetchContato();
    }
  }, [id, navigate, form]);

  useEffect(() => {
    const filtered = abordagens.filter((abordagem) => {
      const matchesApproachType =
        !filters.approachType ||
        abordagem.approachType
          .toLowerCase()
          .includes(filters.approachType.toLowerCase());

      const matchesStatus =
        !filters.status ||
        abordagem.status.toLowerCase().includes(filters.status.toLowerCase());

      const matchesTelephone =
        !filters.telephone || abordagem.telephone.includes(filters.telephone);

      const matchesLastApproachDate =
        !filters.lastApproachDate ||
        new Date(abordagem.lastApproachDate).toISOString().split("T")[0] ===
          filters.lastApproachDate;

      const matchesNextApproachDate =
        !filters.nextApproachDate ||
        new Date(abordagem.nextApproachDate).toISOString().split("T")[0] ===
          filters.nextApproachDate;

      const matchesContactAddressed =
        filters.contactAddressed === undefined ||
        abordagem.contactAddressed === filters.contactAddressed;

      const matchesUserEmail =
        !filters.userEmail ||
        abordagem.userEmail
          .toLowerCase()
          .includes(filters.userEmail.toLowerCase());

      return (
        matchesApproachType &&
        matchesStatus &&
        matchesTelephone &&
        matchesLastApproachDate &&
        matchesNextApproachDate &&
        matchesContactAddressed &&
        matchesUserEmail
      );
    });

    setFilteredAbordagens(filtered);
  }, [filters, abordagens]);

  const handleFilterAbordagens = (newFilters: AbordagemFilterParams) => {
    setFilters(newFilters);
  };

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
      toast({
        title: "Abordagem criada com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      setAbordagens((prevAbordagem) => [...prevAbordagem, abordagemCreated]);
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
        <Container>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                (data) => {
                  onSubmit(data);
                },
                (_errors) => {
                  toast({
                    variant: "destructive",
                    title: "Algo deu errado.",
                  });
                }
              )}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Nome"
                  placeholder="Nome"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Email"
                  disabled={!isEditing}
                />
                <TelephoneFormField
                  control={form.control}
                  name="telephone"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="city"
                  label="Cidade"
                  placeholder="Cidade"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="state"
                  label="Estado"
                  placeholder="Estado"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="areaOfActivity"
                  label="Area de atuação"
                  placeholder="Area de atuação"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="position"
                  label="Cargo"
                  placeholder="Cargo"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="observations"
                  label="Observações"
                  placeholder="Observações"
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

        <Container className="mt-5">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-2xl font-bold">Contatos</h2>
            <div className="flex flex-col md:flex-row gap-2 md:mb-5">
              <AbordagemCreateDialog
                onCreate={handleAddAbordagem}
                contatoId={contatoId}
              />
              <AbordagemFilters onFilter={handleFilterAbordagens} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Abordagem</TableHead>
                <TableHead>Comentário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-center">Contatado</TableHead>
                <TableHead className="text-center">Última Abordagem</TableHead>
                <TableHead className="text-center">Próxima Abordagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAbordagens.map((abordagem) => (
                <TableRow
                  key={abordagem.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => navigate(`/abordagens/${abordagem.id}`)}
                >
                  <TableCell>{abordagem.approachType}</TableCell>
                  <TableCell>{abordagem.comment}</TableCell>
                  <TableCell>{abordagem.status}</TableCell>
                  <TableCell>{abordagem.telephone}</TableCell>
                  <TableCell>{abordagem.userEmail}</TableCell>
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

          {filteredAbordagens.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              Nenhuma abordagem cadastrada
            </div>
          )}
        </Container>
      </div>
    </LoadingPage>
  );
}
