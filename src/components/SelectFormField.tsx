import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectFormField<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  values: boolean[] | string[];
  labels?: string[]; // Optional labels for boolean values
}

export default function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  values,
  labels = ["Sim", "Não"], // Default labels if not provided
}: SelectFormField<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {values.map((value, index) => (
                  <SelectItem
                    key={value.toString()}
                    value={value.toString()}
                    className="cursor-pointer"
                  >
                    {labels[index]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
