import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { userService } from "@/services/userService";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserFiltersProps } from "@/types/User/filters";
import { DialogForm } from "../DialogForm";
import UserCreateDialog from "./UserCreateDialog";
import { UserFormData } from "@/types/User";
import { Label } from "../ui/label";

export function UserActions({
  activeFilters,
  onApplyFilters,
}: UserFiltersProps) {
  const [filterForm, setFilterForm] = useState({
    name: activeFilters.name || "",
    email: activeFilters.email || "",
    role: activeFilters.role || "",
    updatedBy: activeFilters.updatedBy || "",
    createdAt: activeFilters.createdAt || "",
    updatedAt: activeFilters.updatedAt || "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdAtDate, setCreatedAtDate] = useState<Date | undefined>(
    activeFilters.createdAt ? new Date(activeFilters.createdAt) : undefined
  );
  const [updatedAtDate, setUpdatedAtDate] = useState<Date | undefined>(
    activeFilters.updatedAt ? new Date(activeFilters.updatedAt) : undefined
  );

  const handleFilterFormChange = (key: string, value: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setCreatedAtDate(undefined);
    setUpdatedAtDate(undefined);
    setFilterForm({
      name: "",
      email: "",
      role: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
    });
    onApplyFilters({ pageNumber: 1, pageSize: 10 });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
    setIsDialogOpen(false);
  };

  const handleCreateUser = async (data: UserFormData) => {
    try {
      const createdUser = await userService.create(data);
      onApplyFilters({ ...activeFilters, ...filterForm, pageNumber: 1 });
      console.log("User criado com sucesso:", createdUser);
    } catch (error) {
      console.error("Erro ao criar user:", error);
    }
  };

  const handleCreatedAtDate = (selectedDate?: Date) => {
    setCreatedAtDate(selectedDate);
    handleFilterFormChange(
      "createdAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  const handleUpdatedAtDate = (selectedDate?: Date) => {
    setUpdatedAtDate(selectedDate);
    handleFilterFormChange(
      "updatedAt",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 mb-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <UserCreateDialog onCreate={handleCreateUser}></UserCreateDialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DialogForm
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="Filtrar colaborador"
            trigger={
              <Button className="w-full sm:w-auto">
                <Filter />
                Filtrar
              </Button>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                <div className="w-full">
                  <Label>Nome</Label>
                  <Input
                    placeholder="Filtrar por nome"
                    value={filterForm.name}
                    onChange={(e) =>
                      handleFilterFormChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <Label>Email</Label>
                  <Input
                    placeholder="Filtrar por email"
                    value={filterForm.email}
                    onChange={(e) =>
                      handleFilterFormChange("email", e.target.value)
                    }
                  />
                </div>
              </div>
              <Select
                onValueChange={(e) => handleFilterFormChange("role", e)}
                value={filterForm.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtre por permissão" />
                </SelectTrigger>
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
              <div className="flex flex-col gap-3">
                <Popover>
                  <Label>Data de criação</Label>
                  <PopoverTrigger asChild className="flex-1">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !createdAtDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {createdAtDate ? (
                        format(createdAtDate, "PPP", { locale: ptBR })
                      ) : (
                        <span>Data de Criação</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={createdAtDate}
                      onSelect={handleCreatedAtDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <Label>Data de atualização</Label>
                  <PopoverTrigger asChild className="flex-1">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !updatedAtDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {updatedAtDate ? (
                        format(updatedAtDate, "PPP", { locale: ptBR })
                      ) : (
                        <span>Data de Atualização</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={updatedAtDate}
                      onSelect={handleUpdatedAtDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Label>Atualizado por</Label>
              <Input
                placeholder="Atualizado por"
                value={filterForm.updatedBy}
                onChange={(e) =>
                  handleFilterFormChange("updatedBy", e.target.value)
                }
              />
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full sm:w-auto"
              >
                Limpar Filtros
              </Button>
              <Button onClick={handleApplyFilters} className="w-full sm:w-auto">
                Aplicar
              </Button>
            </div>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
