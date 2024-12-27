import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Control, FieldValues, Path } from "react-hook-form";

interface DateFormField<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export function DateFormField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: DateFormField<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
