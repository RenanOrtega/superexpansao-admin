import { useEffect, useState } from "react";
import { PaginationResponse } from "@/types/pagination";
import { DynamicTable } from "../DynamicTable";
import { MapeadorFilterParams } from "@/types/filters";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Mapeador, mapeadorSchema } from "@/types/mapeador";
import { mapeadorService } from "@/services/mapeadorService";
import { MapeadorActions } from "./MapeadorActions";
import { columns } from "./MapeadorColumns";
import { MapeadorEditDialog } from "./MapeadorEditDialog";

export function MapeadorTable() {
  const [data, setData] = useState<PaginationResponse<Mapeador>>({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [activeFilters, setActiveFilters] = useState<MapeadorFilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchData = async () => {
    try {
      const response = await mapeadorService.get(activeFilters);
      setData(response);
      setError(null);
    } catch (error) {
      setError("Erro ao carregar os dados");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeFilters]);

  const handleUpdate = async (id: string, updatedMapeador: Mapeador) => {
    try {
      await mapeadorService.update(id, updatedMapeador);
      setData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item) =>
          item.id === id ? updatedMapeador : item
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await mapeadorService.delete(id);
      setData((prevData) => {
        const updatedItems = prevData.items.filter((item) => item.id !== id);
        return {
          ...prevData,
          items: updatedItems,
          totalItems: prevData.totalItems - 1,
          totalPages: Math.ceil((prevData.totalItems - 1) / prevData.pageSize),
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > data.totalPages) return;

    setActiveFilters((prev) => ({
      ...prev,
      pageNumber: newPage,
    }));
  };

  const table = useReactTable<Mapeador>({
    data: data.items,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: data.pageNumber - 1,
        pageSize: data.pageSize,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data.totalPages,
  });

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Mapeadores</h1>
          <p className="text-sm text-gray-600">Gerenciamento de mapeadores.</p>
        </div>
      </div>
      <MapeadorActions
        activeFilters={activeFilters}
        onApplyFilters={setActiveFilters}
      />
      {error && <div className="text-red-500">{error}</div>}
      <DynamicTable<Mapeador>
        table={table}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        totalPages={data.totalPages}
        pageNumber={data.pageNumber}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        renderEditDialog={(item) => (
          <MapeadorEditDialog
            item={item}
            onUpdate={(newMapeador) => handleUpdate(item.id, newMapeador)}
            schema={mapeadorSchema}
          />
        )}
      />
    </>
  );
}
