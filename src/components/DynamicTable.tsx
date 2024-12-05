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

export function DynamicTable<T extends { id: string }>({
  table,
  onDelete,
  onPageChange,
  totalPages,
  pageNumber,
  hasNextPage,
  hasPreviousPage,
  path,
}: DynamicTableProps<T>) {
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white shadow-lg rounded border-l-2 border-orange-500">
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
                className="cursor-pointer hover:bg-gray-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(row.original.id);
                    }}
                    className="text-red-400 hover:text-red-700 hover:bg-slate-200"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white mt-1 p-3 shadow-lg">
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
