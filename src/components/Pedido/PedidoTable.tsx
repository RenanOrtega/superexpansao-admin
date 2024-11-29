import { useEffect, useState } from "react";
import { PaginationResponse } from "@/types/pagination";
import { DynamicTable } from "../DynamicTable";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Pedido, pedidoSchema } from "@/types/Pedido";
import { pedidoService } from "@/services/pedidoService";
import { PedidoFilterParams } from "@/types/Pedido/filters";
import { columns } from "./PedidoColumns";

export function PedidoTable() {
  const [data, setData] = useState<PaginationResponse<Pedido>>({
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [activeFilters, setActiveFilters] = useState<PedidoFilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fetchData = async () => {
    try {
      const response = await pedidoService.get(activeFilters);
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

  const handleUpdate = async (id: string, newFields: Pedido) => {
    try {
      var pedidoUpdated = await pedidoService.update(id, newFields);
      setData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item) =>
          item.id === id ? pedidoUpdated : item
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await pedidoService.delete(id);
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

  const table = useReactTable<Pedido>({
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
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-sm text-gray-600">Gerenciamento de pedidos.</p>
        </div>
      </div>
      {/* <PedidoActions
        activeFilters={activeFilters}
        onApplyFilters={setActiveFilters}
      /> */}
      {error && <div className="text-red-500">{error}</div>}
      <DynamicTable<Pedido>
        table={table}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        totalPages={data.totalPages}
        pageNumber={data.pageNumber}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        renderEditDialog={(item) => (
          // <PedidoEditDialog
          //   item={item}
          //   onUpdate={(newPedido) => handleUpdate(item.id, newPedido)}
          //   schema={pedidoSchema}
          // />
          <h1>Editar</h1>
        )}
      />
    </>
  );
}
