import { Table } from "@tanstack/react-table";

export interface DynamicTableProps<T> {
  table: Table<T>;
  onDelete?: (id: string) => void;
  onPageChange: (page: number) => void;
  totalPages: number;
  pageNumber: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  path: string;
  showDeleteButton?: boolean;
}

export interface EditDialogProps<T> {
  item: T;
  onEdit: (editedItem: T) => Promise<void>;
}
