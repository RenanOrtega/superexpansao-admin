import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface RoleBasedAccessProps {
  allowedRoles: string[];
  children: ReactNode;
}

export function RoleBasedAccess({
  allowedRoles,
  children,
}: RoleBasedAccessProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
