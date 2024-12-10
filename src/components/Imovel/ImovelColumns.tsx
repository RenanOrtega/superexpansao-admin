import { Imovel } from "@/types/Imovel";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import CustomTag from "../CustomTag";

export const columns: ColumnDef<Imovel>[] = [
  {
    header: "Endereço",
    accessorKey: "address",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("address")}</span>
    ),
  },
  {
    header: "Bairro",
    accessorKey: "neighborhood",
    meta: { isVisible: false },
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
    header: "Zona",
    accessorKey: "zone",
  },
  {
    header: "Perfil do Proprietario",
    accessorKey: "propertyProfile",
  },
  {
    header: "Link",
    accessorKey: "link",
    cell: ({ row }) => {
      const link: string = row.getValue("link");

      if (link) {
        return (
          <a
            href={link}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Link
          </a>
        );
      }

      return "-";
    },
  },
  {
    header: "Disponibilidade",
    accessorKey: "availability",
    cell: ({ row }) => {
      const availability: string = row.getValue("availability");

      const availabilityStyles: { [key: string]: string } = {
        Disponivel: "bg-green-500 text-white dark:text-zinc-900",
        Alugado: "bg-blue-500 text-white dark:text-zinc-900",
        Indisponivel: "bg-red-500 text-white dark:text-zinc-900",
        Motivo: "bg-purple-500 text-white dark:text-zinc-900",
      };

      const backgroundColor = availabilityStyles[availability] || "bg-gray-200";

      return <CustomTag text={availability} className={backgroundColor} />;
    },
  },
  {
    header: "Aluguel",
    accessorKey: "rentValue",
  },
  {
    header: "Venda",
    accessorKey: "saleValue",
  },
  {
    header: "Iptu",
    accessorKey: "iptuValue",
  },
  {
    header: "Metragem",
    accessorKey: "searchMeterage",
  },
  {
    header: "Area Total",
    accessorKey: "totalArea",
  },
  {
    header: "Imobiliaria",
    accessorKey: "realEstate",
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
