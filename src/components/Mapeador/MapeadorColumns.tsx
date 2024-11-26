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
];
