import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Proprietario } from "@/types/Proprietario";

interface ProprietarioComboboxProps<TFieldValues extends FieldValues> {
  fetchProprietarios: (filter?: string) => Promise<Proprietario[]>;
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  placeholder?: string;
}

export function ProprietarioCombobox<TFieldValues extends FieldValues>({
  fetchProprietarios,
  field,
  placeholder = "Selecionar proprietário",
}: ProprietarioComboboxProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProprietarios = async (filter?: string) => {
    if (proprietarios.length === 0 || filter) {
      setIsLoading(true);
      try {
        const result = await fetchProprietarios(filter);
        setProprietarios(result);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
        setProprietarios([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      loadProprietarios();
    }
  };

  const handleSearch = (value: string) => {
    loadProprietarios(value);
  };

  const selectedValue = field.value;

  const selectedProprietario =
    proprietarios.find((p) => p.id === selectedValue) || null;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedProprietario ? selectedProprietario.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Buscar proprietário..."
            className="h-9"
            onValueChange={handleSearch}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Carregando...</CommandEmpty>
            ) : (
              <>
                {proprietarios.length === 0 && (
                  <CommandEmpty>Nenhum proprietário encontrado.</CommandEmpty>
                )}
                <CommandGroup>
                  {proprietarios.map((proprietario) => (
                    <CommandItem
                      key={proprietario.id}
                      value={proprietario.name}
                      onSelect={() => {
                        // Se já estiver selecionado, remove a seleção
                        const newValue =
                          selectedValue === proprietario.id
                            ? undefined
                            : proprietario.id;

                        // Atualiza o valor no react-hook-form
                        field.onChange(newValue);
                        setOpen(false);
                      }}
                    >
                      {proprietario.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedValue === proprietario.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
