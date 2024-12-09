import { useState } from "react";
import { Button } from "../ui/button";
import { userService } from "@/services/userService";
import { Filter } from "lucide-react";
import { format } from "date-fns";
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
import InputFilter from "../InputFilter";
import { DialogFooter } from "../ui/dialog";

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
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                <InputFilter
                  label="Nome"
                  placeholder="Filtrar por nome"
                  type="text"
                  value={filterForm.name}
                  onChange={(e) =>
                    handleFilterFormChange("name", e.target.value)
                  }
                />
                <InputFilter
                  label="Email"
                  placeholder="Filtrar por email"
                  type="text"
                  value={filterForm.email}
                  onChange={(e) =>
                    handleFilterFormChange("email", e.target.value)
                  }
                />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputFilter
                  label="Data de criação"
                  type="date"
                  placeholder="Selecione uma data"
                  date={createdAtDate}
                  setDate={handleCreatedAtDate}
                  value={filterForm.createdAt}
                />
                <InputFilter
                  label="Data de atualização"
                  type="date"
                  placeholder="Selecione uma data"
                  date={updatedAtDate}
                  setDate={handleUpdatedAtDate}
                  value={filterForm.updatedAt}
                />
              </div>
              <InputFilter
                label="Atualizado por"
                placeholder="Atualizado por"
                onChange={(e) =>
                  handleFilterFormChange("updatedBy", e.target.value)
                }
                value={filterForm.updatedBy}
                type="text"
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="w-full sm:w-auto"
                >
                  Aplicar
                </Button>
              </DialogFooter>
            </div>
          </DialogForm>
        </div>
      </div>
    </div>
  );
}
