import { useEffect, useState } from "react";
import { PaginationResponse } from "@/types/pagination";
import { DynamicTable } from "../DynamicTable";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/types/User";
import { UserFilterParams } from "@/types/User/filters";
import { userService } from "@/services/userService";
import { columns } from "./UserColumns";
import { UserActions } from "./UserActions";
import { UserRoundPen } from "lucide-react";
import PageHeader from "../PageHeader";

export function UserTable() {
  const [data, setData] = useState<PaginationResponse<User>>({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [activeFilters, setActiveFilters] = useState<UserFilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchData = async () => {
    try {
      const response = await userService.get(activeFilters);
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
    await userService.delete(id);
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

  const table = useReactTable<User>({
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
        Icon={UserRoundPen}
        title="Colaboradores"
        subtitle="Gerenciamento de colaboradores."
      />
      <UserActions
        activeFilters={activeFilters}
        onApplyFilters={setActiveFilters}
      />
      {error && <div className="text-red-500">{error}</div>}
      <DynamicTable<User>
        table={table}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        totalPages={data.totalPages}
        pageNumber={data.pageNumber}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        path="colaboradores"
      />
    </>
  );
}
