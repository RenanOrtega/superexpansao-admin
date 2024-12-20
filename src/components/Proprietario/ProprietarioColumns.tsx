import { Proprietario } from "@/types/Proprietario";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Proprietario>[] = [
  {
    header: "Nome",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("name")}</span>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Telefone",
    accessorKey: "telephone",
  },
  {
    header: "Logradouro",
    accessorKey: "address",
  },
  {
    header: "Bairro",
    accessorKey: "neighboor",
  },
  {
    header: "Cidade",
    accessorKey: "city",
  },
  {
    header: "Estado",
    accessorKey: "state",
  },
  {
    header: "Fonte",
    accessorKey: "source",
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
  {
    header: "Observações",
    accessorKey: "observations",
  },
];
