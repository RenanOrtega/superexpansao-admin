import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import InputMask from "react-input-mask";

interface TelephoneFormField<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export default function TelephoneFormField<T extends FieldValues>({
  control,
  name,
}: TelephoneFormField<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <InputMask
              className="dark:bg-zinc-950"
              mask="(99) 99999-9999"
              maskChar="_"
              placeholder="(00) 00000-0000"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {(inputProps) => <Input {...inputProps} />}
            </InputMask>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
