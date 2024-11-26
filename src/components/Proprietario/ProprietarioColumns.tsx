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
    accessorKey: "updatedAt",
    // cell: ({ row }) => format(row.getValue("updatedAt"), "dd/MM/yyyy"),
  },
  {
    header: "Data cadastro",
    accessorKey: "createdAt",
    cell: ({ row }) => format(row.getValue("createdAt"), "dd/MM/yyyy"),
  },
  {
    header: "Atualizado por",
    accessorKey: "updatedBy",
  },
  {
    header: "Observações",
    accessorKey: "observations",
  },
];
