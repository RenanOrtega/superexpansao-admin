import { useState } from "react";
import InputMask from "react-input-mask";
import { Control, FieldValues, Path } from "react-hook-form";
import { Address } from "@/types/Address";
import { viaCepService } from "@/services/viaCepApi";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface CepAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onAddressChange?: (address: Address) => void;
  disabled?: boolean;
}

export default function CepAutocomplete<T extends FieldValues>({
  control,
  name,
  onAddressChange,
  disabled = false,
}: CepAutocompleteProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) return;

    setIsLoading(true);
    setError(null);

    try {
      const address = await viaCepService.getByCep(cleanCep);
      onAddressChange?.(address);
    } catch (err) {
      setError("Erro ao buscar CEP. Verifique se o CEP é válido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <InputMask
                mask="99999-999"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={field.value}
                placeholder="CEP"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (!disabled) {
                    handleCepChange(e.target.value);
                  }
                }}
                onBlur={field.onBlur}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isLoading && (
        <div className="text-sm text-muted-foreground">Buscando CEP...</div>
      )}

      {error && <div className="text-sm text-destructive">{error}</div>}
    </div>
  );
}
