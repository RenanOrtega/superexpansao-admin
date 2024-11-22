import { EditDialogProps } from "@/types/table";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function EditDialog<T extends { id: string }>({
  item,
  onEdit,
}: EditDialogProps<T>) {
  const [editedItem, setEditedItem] = useState<T>(item);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key: keyof T, value: string) => {
    setEditedItem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onEdit(editedItem);
    } catch (error) {
      console.error("Error editing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4 text-blue-500 hover:text-blue-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
        </DialogHeader>

        {(Object.keys(item) as Array<keyof T>)
          .filter((key) => key !== "id")
          .map((key) => (
            <div
              key={String(key)}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label className="text-left">{String(key)}</Label>
              <Input
                className="col-span-3"
                value={String(editedItem[key] || "")}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
