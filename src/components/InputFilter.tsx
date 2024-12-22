import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import React from "react";

interface InputFilterProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | undefined;
  type: "text" | "number" | "date";
  placeholder: string;
  label: string;
  date?: Date;
  fieldName?: string;
  handleDate?: (fieldName: string, date?: Date) => void;
}

export default function InputFilter({
  onChange,
  value,
  type,
  placeholder,
  label,
  date,
  fieldName,
  handleDate,
}: InputFilterProps) {
  if (type !== "date") {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={label}>{label}</Label>
        <Input
          type={type}
          id={label}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) =>
              handleDate && fieldName && handleDate(fieldName, newDate)
            }
            locale={ptBR}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
