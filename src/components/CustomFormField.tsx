import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface CustomFormField<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
  className?: string;
  onChange?: (value: string | number | undefined) => any;
}

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className = "w-full ",
  onChange,
}: CustomFormField<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="dark:bg-zinc-950"
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const rawValue = e.target.value;
                const value =
                  type === "number"
                    ? rawValue === ""
                      ? undefined
                      : Number(rawValue)
                    : rawValue;

                const processedValue = onChange ? onChange(value) : value;
                field.onChange(processedValue);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
