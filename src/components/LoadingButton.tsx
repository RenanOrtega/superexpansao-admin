import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "link";
  type?: "submit" | "reset" | "button" | undefined;
  isLoading: boolean;
}

export function LoadingButton({
  children,
  className = "",
  variant = "default",
  type = "submit",
  isLoading,
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      variant={variant}
      type={type}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Carregando
        </>
      ) : (
        children
      )}
    </Button>
  );
}
