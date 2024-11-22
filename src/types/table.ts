import { Table } from "@tanstack/react-table";

export interface DynamicTableProps<T> {
  table: Table<T>;
  onDelete: (id: string) => void;
  onEdit: (id: string, editedItem: T) => void;
  onPageChange: (page: number) => void;
  totalPages: number;
  pageNumber: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EditDialogProps<T> {
  item: T;
  onEdit: (editedItem: T) => Promise<void>;
}
