import { empresaService } from "@/services/empresaService";
import { empresaSchema } from "@/types/Empresa";
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
import { ContatoCreateDialog } from "../Contato/ContatoCreateDialog";
import { Contato, ContatoFormData } from "@/types/Contato";
import { contatoService } from "@/services/contatoService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useToast } from "@/hooks/use-toast";
import ContatoFilters from "../Contato/ContatoFilters";
import { ContatoFilterParams } from "@/types/Contato/filters";
import { format } from "date-fns";
import { RoleBasedAccess } from "../RoleBasedAccess";

export function EmpresaDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof empresaSchema>>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      fantasyName: "",
      category: "",
      socialReason: "",
      telephone: "",
    },
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        setIsLoading(true);
        const response = await empresaService.getById(id);
        form.reset({
          category: response.category,
          fantasyName: response.fantasyName,
          socialReason: response.socialReason,
          telephone: response.telephone,
        });
        setContatos(response.contatos);
        setEmpresaId(response.id);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
        navigate("/clientes");
      }
    };

    if (id) {
      fetchEmpresa();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof empresaSchema>) => {
    setIsButtonLoading(true);
    try {
      await empresaService.update(id!, { ...data, id });
      toast({
        title: "Cliente atualizada com sucesso.",
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

  const handleAddContato = async (data: ContatoFormData, empresaId: string) => {
    try {
      var contatoCreated = await contatoService.create(data, empresaId);
      toast({
        title: "Contato criado com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      setContatos((prevContatos) => [...prevContatos, contatoCreated]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
      });
    }
  };

  const [contatos, setContatos] = useState<Contato[]>([]);
  const [filteredContatos, setFilteredContatos] = useState<Contato[]>([]);
  const [filters, setFilters] = useState<ContatoFilterParams>({});

  useEffect(() => {
    const filtered = contatos.filter((contato) => {
      const matchesName =
        !filters.name ||
        contato.name.toLowerCase().includes(filters.name.toLowerCase());

      const matchesEmail =
        !filters.email ||
        contato.email.toLowerCase().includes(filters.email.toLowerCase());

      const matchesTelephone =
        !filters.telephone || contato.telephone.includes(filters.telephone);

      const matchesPosition =
        !filters.position ||
        contato.position.toLowerCase().includes(filters.position.toLowerCase());

      const matchesCity =
        !filters.city ||
        contato.city.toLowerCase().includes(filters.city.toLowerCase());

      const matchesState =
        !filters.state ||
        contato.state.toLowerCase().includes(filters.state.toLowerCase());

      const matchesArea =
        !filters.areaOfActivity ||
        contato.areaOfActivity
          .toLowerCase()
          .includes(filters.areaOfActivity.toLowerCase());

      const matchesCreatedAt =
        !filters.createdAt ||
        new Date(contato.createdAt).toISOString().split("T")[0] ===
          filters.createdAt;

      const matchesUpdatedAt =
        !filters.updatedAt ||
        (contato.updatedAt &&
          new Date(contato.updatedAt).toISOString().split("T")[0] ===
            filters.updatedAt);

      return (
        matchesName &&
        matchesEmail &&
        matchesTelephone &&
        matchesPosition &&
        matchesCity &&
        matchesState &&
        matchesArea &&
        matchesCreatedAt &&
        matchesUpdatedAt
      );
    });

    setFilteredContatos(filtered);
  }, [filters, contatos]);
  const handleFilterContatos = (newFilters: ContatoFilterParams) => {
    console.log(newFilters);
    setFilters(newFilters);
  };

  return (
    <LoadingPage isLoading={isLoading}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
          <Button
            variant="outline"
            onClick={() => navigate("/clientes")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Clientes
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
                <CustomFormField
                  control={form.control}
                  name="fantasyName"
                  label="Nome fantasia"
                  placeholder="Nome fantasia"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="socialReason"
                  label="Razão social"
                  placeholder="Razão social"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="category"
                  label="Categoria"
                  placeholder="Categoria"
                  disabled={!isEditing}
                />
                <TelephoneFormField
                  control={form.control}
                  name="telephone"
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
              <ContatoCreateDialog
                onCreate={handleAddContato}
                empresaId={empresaId}
              />
              <ContatoFilters onFilter={handleFilterContatos} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Area de atuação</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContatos.map((contato) => (
                <TableRow
                  key={contato.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => navigate(`/contatos/${contato.id}`)}
                >
                  <TableCell>{contato.name}</TableCell>
                  <TableCell>{contato.position}</TableCell>
                  <TableCell>{contato.city}</TableCell>
                  <TableCell>{contato.state}</TableCell>
                  <TableCell>{contato.areaOfActivity}</TableCell>
                  <TableCell>{contato.email}</TableCell>
                  <TableCell>{contato.telephone}</TableCell>
                  <TableCell>
                    {contato.createdAt
                      ? format(contato.createdAt, "dd/MM/yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {contato.updatedAt
                      ? format(contato.updatedAt, "dd/MM/yyyy")
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        {filteredContatos.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            Nenhum contato encontrado
          </div>
        )}
      </div>
    </LoadingPage>
  );
}
