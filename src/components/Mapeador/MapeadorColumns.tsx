import { Mapeador } from "@/types/Mapeador";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
