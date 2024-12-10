import { Pedido } from "@/types/Pedido";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Pedido>[] = [
  {
    header: "Cliente",
    accessorKey: "client",
  },
  {
    header: "Data de Entrada",
    accessorKey: "entryDate",
    cell: ({ row }) => {
      const entryDate: Date = row.getValue("entryDate");
      return entryDate ? format(new Date(entryDate), "dd/MM/yyyy") : "-";
    },
  },
  {
    header: "Data de Entrega",
    accessorKey: "deliveryDate",
    cell: ({ row }) => {
      const deliveryDate: Date = row.getValue("deliveryDate");
      return deliveryDate ? format(new Date(deliveryDate), "dd/MM/yyyy") : "-";
    },
  },
  {
    header: "Responsavel",
    accessorKey: "performer",
  },
  {
    header: "Coordenador",
    accessorKey: "coordinator",
  },
  {
    header: "Pedido",
    accessorKey: "order",
  },
  {
    header: "Ponto Zero",
    accessorKey: "zeroPoint",
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
    header: "Status",
    accessorKey: "status",
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
