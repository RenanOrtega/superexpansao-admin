import { useEffect, useState } from "react";
import { PaginationResponse } from "@/types/pagination";
import { DynamicTable } from "../DynamicTable";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Empresa } from "@/types/Empresa";
import { EmpresaFilterParams } from "@/types/Empresa/filters";
import { empresaService } from "@/services/empresaService";
import { columns } from "./EmpresaColumns";
import { EmpresaActions } from "./EmpresaActions";
import PageHeader from "../PageHeader";
import { Building2 } from "lucide-react";

export function EmpresaTable() {
  const [data, setData] = useState<PaginationResponse<Empresa>>({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [activeFilters, setActiveFilters] = useState<EmpresaFilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchData = async () => {
    try {
      const response = await empresaService.get(activeFilters);
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

  const handleDelete = async (id: string) => {
    await empresaService.delete(id);
    setData((prevData) => {
      const updatedItems = prevData.items.filter((item) => item.id !== id);
      return {
        ...prevData,
        items: updatedItems,
        totalItems: prevData.totalItems - 1,
        totalPages: Math.ceil((prevData.totalItems - 1) / prevData.pageSize),
      };
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > data.totalPages) return;

    setActiveFilters((prev) => ({
      ...prev,
      pageNumber: newPage,
    }));
  };

  const table = useReactTable<Empresa>({
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
      <PageHeader
        Icon={Building2}
        title="Clientes"
        subtitle="Gerenciamento de clientes."
      />
      <EmpresaActions
        activeFilters={activeFilters}
        onApplyFilters={setActiveFilters}
      />
      {error && <div className="text-red-500">{error}</div>}
      <DynamicTable<Empresa>
        table={table}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        totalPages={data.totalPages}
        pageNumber={data.pageNumber}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        path="clientes"
        showDeleteButton={true}
      />
    </>
  );
}
