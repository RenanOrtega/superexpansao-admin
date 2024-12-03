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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

type UserFormData = z.infer<typeof userSchema>;

export default function UserCreateDialog({ onCreate }: CreateUserDialogProps) {
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
      console.log(data);
      await onCreate(data);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissão</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma permissão:" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="Admin">
                      Admin
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Moderador">
                      Moderador
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Padrão">
                      Padrão
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogForm>
  );
}
