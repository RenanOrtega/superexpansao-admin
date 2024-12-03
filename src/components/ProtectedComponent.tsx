import { useAuth } from "@/contexts/AuthContext";

interface ProtectedComponentProps {
  roles: string[];
  children: React.ReactNode;
}

export function ProtectedComponent({
  roles,
  children,
}: ProtectedComponentProps) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
