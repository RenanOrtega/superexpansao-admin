import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DynamicTableProps } from "@/types/table";
import { flexRender } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import Container from "./Container";
import { useAuth } from "@/contexts/AuthContext";

export function DynamicTable<T extends { id: string }>({
  table,
  onDelete,
  onPageChange,
  totalPages,
  pageNumber,
  hasNextPage,
  hasPreviousPage,
  path,
  showDeleteButton = false,
}: DynamicTableProps<T>) {
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user!.role;
  console.log(userRole);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const confirmDelete = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <AlertDialog open={!!itemToDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isto irá excluir permanentemente
              este item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Container className="border-l-2 border-orange-500">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() &&
                      (header.column.getIsSorted() === "asc" ? " ↑" : " ↓")}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => navigate(`/${path}/${row.original.id}`)}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {showDeleteButton &&
                (userRole === "Admin" || userRole === "Moderador") ? (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) {
                          setItemToDelete(row.original.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-700 hover:bg-slate-200 dark:hover:bg-zinc-800"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 mt-1 p-3 shadow rounded-lg">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={!hasPreviousPage}
          className="w-full sm:w-auto"
        >
          Anterior
        </Button>
        <span className="flex items-center gap-1 text-center">
          <div>Página</div>
          <strong>
            {pageNumber} de {totalPages === 0 ? 1 : totalPages}
          </strong>
        </span>
        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={!hasNextPage}
          className="w-full sm:w-auto"
        >
          Próximo
        </Button>
      </div>
    </>
  );
}
