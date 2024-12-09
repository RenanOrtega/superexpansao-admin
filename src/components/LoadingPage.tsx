import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
}

export default function LoadingPage({ children, isLoading }: LoadingPageProps) {
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin w-10 h-10 mb-2" />
            <span>Carregando</span>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
