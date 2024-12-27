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
import { User } from "@/types/User";
import { userService } from "@/services/userService";

interface UserComboboxProps {
  value?: string | null;
  onChange?: (value?: string | null) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function UserCombobox({
  value,
  onChange,
  placeholder = "Selecionar responsável",
  label = "Responsável",
  className = "",
  disabled = false,
}: UserComboboxProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialUsers = async () => {
      try {
        const response = await userService.get({});
        setUsers(response.items);
      } catch (error) {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialUsers();
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (!disabled) {
      setOpen(newOpen);
    }
  };

  const handleSearch = async (value: string) => {
    if (disabled) return;
    setIsLoading(true);
    try {
      const response = await userService.get({ email: value });
      setUsers(response.items);
    } catch (error) {
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (email?: string) => {
    if (disabled) return;
    const newValue = value === email ? null : email;

    onChange?.(newValue);
    setOpen(false);
  };

  const selectedUser = users.find((p) => p.email === value) || null;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor="user-combobox" className="text-sm font-medium">
        {label}
      </label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="user-combobox"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {isLoading
              ? "Carregando..."
              : selectedUser
              ? selectedUser.email
              : placeholder}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Buscar usuário..."
              className="h-9"
              onValueChange={handleSearch}
              disabled={disabled}
            />
            <CommandList>
              {isLoading ? (
                <CommandEmpty>Carregando...</CommandEmpty>
              ) : (
                <>
                  {users.length === 0 && (
                    <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.email}
                        onSelect={() => handleSelect(user.email)}
                      >
                        {user.email}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === user.id ? "opacity-100" : "opacity-0"
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
