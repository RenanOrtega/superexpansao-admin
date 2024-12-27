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

interface SelectFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  values: any[];
  labels?: any[];
  disabled?: boolean;
}

export default function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  values,
  labels,
  disabled,
}: SelectFormFieldProps<T>) {
  const displayLabels = labels || values;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                const parsedValue = values[displayLabels.indexOf(value)];
                field.onChange(parsedValue);
              }}
              value={
                displayLabels[values.indexOf(field.value)]?.toString() || ""
              }
            >
              <SelectTrigger className="dark:bg-zinc-950" disabled={disabled}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {displayLabels.map((label, index) => (
                  <SelectItem
                    key={values[index].toString()}
                    value={label.toString()}
                    className="cursor-pointer"
                    disabled={disabled}
                  >
                    {label}
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
