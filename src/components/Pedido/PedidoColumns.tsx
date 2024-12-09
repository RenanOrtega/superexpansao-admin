import { Pedido } from "@/types/Pedido";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Pedido>[] = [
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
    header: "responsavel",
    accessorKey: "performer",
  },
  {
    header: "Coordenador",
    accessorKey: "coordinator",
  },
  {
    header: "Expansor",
    accessorKey: "expander",
  },
  {
    header: "Número do Pedido",
    accessorKey: "orderNumber",
  },
  {
    header: "Valor do Imóvel",
    accessorKey: "propertyValue",
  },
  {
    header: "Ponto Zero",
    accessorKey: "zeroPoint",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Observações",
    accessorKey: "observations",
  },
  {
    header: "Estado",
    accessorKey: "state",
  },
  {
    header: "Cidade",
    accessorKey: "city",
  },
];
