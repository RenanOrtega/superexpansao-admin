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
    header: "Executor",
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
  {
    header: "Tipo de Propriedade",
    accessorKey: "propertyType",
  },
  {
    header: "Área Total",
    accessorKey: "totalArea",
  },
  {
    header: "Área Construída",
    accessorKey: "builtArea",
  },
  {
    header: "Vagas de Estacionamento",
    accessorKey: "parkingSpaces",
  },
  {
    header: "Metragem Mínima",
    accessorKey: "minimumMeterage",
  },
  {
    header: "Metragem Máxima",
    accessorKey: "maximumMeterage",
  },
  {
    header: "Street View",
    accessorKey: "streetView",
    cell: ({ row }) => {
      const streetView: string = row.getValue("streetView");
      return streetView ? (
        <a
          href={streetView}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visualizar
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "Data do Street View",
    accessorKey: "streetViewDate",
    cell: ({ row }) => {
      const streetViewDate: Date = row.getValue("streetViewDate");
      return streetViewDate
        ? format(new Date(streetViewDate), "dd/MM/yyyy")
        : "-";
    },
  },
  {
    header: "Criado Online",
    accessorKey: "onlineCreated",
    cell: ({ row }) => (row.getValue("onlineCreated") ? "Sim" : "Não"),
  },
  {
    header: "Data Online",
    accessorKey: "onlineDate",
    cell: ({ row }) => {
      const onlineDate: Date = row.getValue("onlineDate");
      return onlineDate ? format(new Date(onlineDate), "dd/MM/yyyy") : "-";
    },
  },
  {
    header: "Mapeamento Concluído",
    accessorKey: "mappingCompleted",
    cell: ({ row }) => (row.getValue("mappingCompleted") ? "Sim" : "Não"),
  },
];
