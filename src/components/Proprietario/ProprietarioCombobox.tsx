import { useState, useEffect } from "react";
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
import { Proprietario } from "@/types/Proprietario";
import { proprietarioService } from "@/services/proprietarioService";

interface ProprietarioComboboxProps {
  value?: string | null;
  onChange?: (value?: string | null) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function ProprietarioCombobox({
  value,
  onChange,
  placeholder = "Selecionar proprietário",
  label = "Proprietário",
  className = "",
}: ProprietarioComboboxProps) {
  const [open, setOpen] = useState(false);
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialProprietarios = async () => {
      try {
        const response = await proprietarioService.get({});
        setProprietarios(response.items);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
        setProprietarios([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProprietarios();
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSearch = async (value: string) => {
    setIsLoading(true);
    try {
      const response = await proprietarioService.get({ search: value });
      setProprietarios(response.items);
    } catch (error) {
      console.error("Erro ao buscar proprietários:", error);
      setProprietarios([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (proprietarioId?: string) => {
    // Se o ID selecionado for o mesmo que o valor atual, desmarque
    const newValue = value === proprietarioId ? null : proprietarioId;

    // Chame a função onChange se ela existir
    onChange?.(newValue);
    setOpen(false);
  };

  const selectedProprietario =
    proprietarios.find((p) => p.id === value) || null;

  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor="proprietario-combobox" className="text-sm font-medium">
        {label}
      </label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="proprietario-combobox"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {isLoading
              ? "Carregando..."
              : selectedProprietario
              ? selectedProprietario.name
              : placeholder}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
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
                        onSelect={() => handleSelect(proprietario.id)}
                      >
                        {proprietario.name}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === proprietario.id
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
    </div>
  );
}
