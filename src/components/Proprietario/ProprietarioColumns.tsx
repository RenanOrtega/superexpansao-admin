import { Proprietario } from "@/types/proprietario";
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
    header: "Fonte",
    accessorKey: "source",
  },
  {
    header: "Telefone",
    accessorKey: "telephone",
  },
  {
    header: "Endereço",
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
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Data atualização",
    accessorKey: "UpdatedAt",
    cell: ({ row }) => format(row.getValue("lastMapping"), "dd/MM/yyyy"),
  },
  {
    header: "Data cadastro",
    accessorKey: "CreatedAt",
    cell: ({ row }) => format(row.getValue("lastMapping"), "dd/MM/yyyy"),
  },
  {
    header: "Atualizado por",
    accessorKey: "UpdatedBy",
  },
  {
    header: "Observações",
    accessorKey: "Observations",
  },
];
