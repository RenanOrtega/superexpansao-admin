import { Empresa } from "@/types/Empresa";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Empresa>[] = [
  {
    header: "Nome Fantasia",
    accessorKey: "fantasyName",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("fantasyName")}</span>
    ),
  },
  {
    header: "Razão Social",
    accessorKey: "socialReason",
  },
  {
    header: "Categoria",
    accessorKey: "category",
  },
  {
    header: "Setor",
    accessorKey: "sector",
  },
  {
    header: "Telefone",
    accessorKey: "telephone",
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
