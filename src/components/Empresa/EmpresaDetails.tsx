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

export function EmpresaDetails() {
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
      setIsButtonLoading(false);
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
    }
  };

  const handleAddContato = async (data: ContatoFormData, empresaId: string) => {
    try {
      var contatoCreated = await contatoService.create(data, empresaId);
      setContatos((prevContatos) => [...prevContatos, contatoCreated]);
    } catch (error) {
      console.log("DEU ERRO:" + error);
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
            <h2 className="text-2xl font-bold">Contatos</h2>
            <ContatoCreateDialog
              onCreate={handleAddContato}
              empresaId={empresaId}
            />
          </div>
        </Container>
        <div className="grid grid-cols-1 gap-2 mt-5">
          {contatos.map((contato) => {
            return (
              <div
                onClick={() => {
                  navigate(`/contatos/${contato.id}`);
                }}
              >
                <Container className="cursor-pointer hover:border-blue-700 hover:border-x-8">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-semibold truncate">{contato.name}</div>
                    <div className="truncate">{contato.position}</div>
                    <div className="truncate">{contato.email}</div>
                    <div className="truncate">{contato.telephone}</div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
        {contatos.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            Nenhum contato cadastrado
          </div>
        )}
      </div>
    </LoadingPage>
  );
}
