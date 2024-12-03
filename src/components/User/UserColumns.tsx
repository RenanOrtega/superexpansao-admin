import { User } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<User>[] = [
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
    header: "Permissão",
    accessorKey: "role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      const roleStyles: { [key: string]: string } = {
        Admin: "bg-red-500 text-white",
        Moderador: "bg-blue-500 text-white",
        Padrão: "bg-teal-500 text-white",
      };

      const backgroundColor = roleStyles[role] || "bg-gray-200";

      return (
        <span className={`px-2 py-1 rounded-full text-xs ${backgroundColor}`}>
          {role}
        </span>
      );
    },
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
