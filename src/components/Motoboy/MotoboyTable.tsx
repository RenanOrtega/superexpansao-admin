import { useEffect, useState } from "react";
import { PaginationResponse } from "@/types/pagination";
import { DynamicTable } from "../DynamicTable";
import { motoboyService } from "@/services/motoboyService";
import { MotoboyFilterParams } from "@/types/filters";
import { Motoboy } from "@/types/motoboy";
import { columns } from "./MotoboyColumns";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { MotoboyFilters } from "./MotoboyFilters";

export function MotoboyTable() {
  const [data, setData] = useState<PaginationResponse<Motoboy>>({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [activeFilters, setActiveFilters] = useState<MotoboyFilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchData = async () => {
    try {
      const response = await motoboyService.get(activeFilters);
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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > data.totalPages) return;

    setActiveFilters((prev) => ({
      ...prev,
      pageNumber: newPage,
    }));
  };

  const table = useReactTable<Motoboy>({
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
          <h1 className="text-2xl font-bold">Motoboys</h1>
          <p className="text-sm text-gray-600">Gerenciamento de motoboys.</p>
        </div>
      </div>
      <MotoboyFilters
        activeFilters={activeFilters}
        onApplyFilters={setActiveFilters}
      />
      {error && <div className="text-red-500">{error}</div>}
      <DynamicTable<Motoboy>
        table={table}
        onDelete={() => {}}
        onEdit={() => {}}
        onPageChange={handlePageChange}
        totalPages={data.totalPages}
        pageNumber={data.pageNumber}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
      />
    </>
  );
}
