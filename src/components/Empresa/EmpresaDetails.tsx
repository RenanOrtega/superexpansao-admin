import { empresaService } from "@/services/empresaService";
import { empresaSchema } from "@/types/Empresa";
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

export function EmpresaDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState<string>("");
  const [contatos, setContatos] = useState<Contato[]>([]);

  const form = useForm<z.infer<typeof empresaSchema>>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      fantasyName: "",
      category: "",
      sector: "",
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
          sector: response.sector,
          socialReason: response.socialReason,
          telephone: response.telephone,
        });
        setContatos(response.contatos);
        setEmpresaId(response.id);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
        navigate("/empresas");
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
        title: "Empresa atualizada com sucesso.",
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

  return (
    <LoadingPage isLoading={isLoading}>
      <div className="container mx-auto p-4">
        <Button
          variant="outline"
          onClick={() => navigate("/empresas")}
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
                  name="fantasyName"
                  label="Nome fantasia"
                  placeholder="Nome fantasia"
                />
                <CustomFormField
                  control={form.control}
                  name="socialReason"
                  label="Razão social"
                  placeholder="Razão social"
                />
                <CustomFormField
                  control={form.control}
                  name="category"
                  label="Categoria"
                  placeholder="Categoria"
                />
                <CustomFormField
                  control={form.control}
                  name="sector"
                  label="Setor"
                  placeholder="Setor"
                />
                <TelephoneFormField control={form.control} name="telephone" />
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
            <h2 className="text-2xl font-bold">Contatos</h2>
            {/* <ContatoFilters /> */}
            <ContatoCreateDialog
              onCreate={handleAddContato}
              empresaId={empresaId}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contatos.map((contato) => (
                <TableRow
                  key={contato.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => navigate(`/contatos/${contato.id}`)}
                >
                  <TableCell>{contato.name}</TableCell>
                  <TableCell>{contato.position}</TableCell>
                  <TableCell>{contato.email}</TableCell>
                  <TableCell>{contato.telephone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        {contatos.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            Nenhum contato cadastrado
          </div>
        )}
      </div>
    </LoadingPage>
  );
}
