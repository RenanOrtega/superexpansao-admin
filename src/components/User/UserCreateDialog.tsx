import { CreateUserDialogProps, userSchema } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CustomFormField } from "../CustomFormField";
import { Button } from "../ui/button";
import { DialogForm } from "../DialogForm";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import SelectFormField from "../SelectFormField";
import { useToast } from "@/hooks/use-toast";

type UserFormData = z.infer<typeof userSchema>;

export default function UserCreateDialog({ onCreate }: CreateUserDialogProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await onCreate(data);
      toast({
        title: "Usuario criado com sucesso.",
        className: "bg-green-400 dark:text-zinc-900",
      });
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo deu errado.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      form.reset();
      setShowPassword(false);
    }
  };

  return (
    <DialogForm
      title="Novo usuario"
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      trigger={
        <Button className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Novo usuario
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            control={form.control}
            label="E-mail"
            name="email"
            placeholder="seu.email@exemplo.com"
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-1 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Deve conter 8+ caracteres, maiúsculas, minúsculas, números e
                  especiais
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomFormField
            control={form.control}
            label="Nome"
            name="name"
            placeholder="Nome"
          />
          <SelectFormField
            control={form.control}
            label="Permissão"
            name="role"
            placeholder="Selecione a permissão"
            values={["Admin", "Moderador", "Padrão"]}
            labels={["Admin", "Moderador", "Padrão"]}
          />
          <DialogFooter>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
