import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { userUpdateSchema } from "@/types/User";
import { userService } from "@/services/userService";
import SelectFormField from "../SelectFormField";
import { LoadingButton } from "../LoadingButton";
import Container from "../Container";
import LoadingPage from "../LoadingPage";
import { useToast } from "@/hooks/use-toast";
import { RoleBasedAccess } from "../RoleBasedAccess";

export function UserDetails() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: "",
      name: "",
      role: undefined,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await userService.getById(id);
        form.reset({
          email: response.email,
          name: response.name,
          role: response.role,
        });
        setIsLoading(false);
      } catch (error) {
        navigate("/usuarios");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: z.infer<typeof userUpdateSchema>) => {
    try {
      setIsButtonLoading(true);
      await userService.update(id!, { ...data, id });
      toast({
        title: "Usuario atualizado com sucesso.",
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
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
          <Button
            variant="outline"
            onClick={() => navigate("/usuarios")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Usuarios
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
        <Container>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                async (data) => {
                  await onSubmit(data);
                },
                (errors) => {
                  console.error("Erros de validação:", errors);
                }
              )}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Nome"
                  placeholder="Nome do Mapeador"
                  disabled={!isEditing}
                />
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Nome do Mapeador"
                  disabled={!isEditing}
                />
                <SelectFormField
                  control={form.control}
                  name="role"
                  label="Permissão"
                  placeholder="Selecionne a permissão"
                  values={["Admin", "Moderador", "Padrão"]}
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
