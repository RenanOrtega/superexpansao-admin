import { Mapeador } from "@/types/Mapeador";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import CustomTag from "../CustomTag";

export const columns: ColumnDef<Mapeador>[] = [
  {
    header: "Nome",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("name")}</span>
    ),
  },
  {
    header: "Telefone",
    accessorKey: "telephone",
  },
  {
    header: "Cidade",
    accessorKey: "city",
  },
  {
    header: "Veículo",
    accessorKey: "vehicle",
    cell: ({ row }) => {
      const vehicle: string = row.getValue("vehicle");

      const vehicleStyles: { [key: string]: string } = {
        Moto: "bg-red-500 text-white dark:text-zinc-900",
        Carro: "bg-blue-500 text-white dark:text-zinc-900",
      };

      const backgroundColor = vehicleStyles[vehicle] || "bg-gray-200";

      return <CustomTag text={vehicle} className={backgroundColor} />;
    },
  },
  {
    header: "Pix",
    accessorKey: "pix",
  },
  {
    header: "Último Mapeamento",
    accessorKey: "lastMapping",
    cell: ({ row }) => format(row.getValue("lastMapping"), "dd/MM/yyyy"),
  },
  {
    header: "Observações",
    accessorKey: "observations",
  },
  {
    header: "Data atualização",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const updatedAt: string = row.getValue("updatedAt");
      return updatedAt ? format(updatedAt, "dd/MM/yyyy") : "-";
    },
  },
  {
    header: "Data cadastro",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return createdAt ? format(createdAt, "dd/MM/yyyy") : "-";
    },
  },
  {
    header: "Atualizado por",
    accessorKey: "updatedBy",
    cell: ({ row }) => {
      const updatedBy: string = row.getValue("updatedBy");
      return updatedBy ? updatedBy : "-";
    },
  },
];
