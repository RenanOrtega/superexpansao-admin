import { LucideIcon } from "lucide-react";
import Container from "./Container";

interface HeaderProps {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
}

export default function PageHeader({ Icon, title, subtitle }: HeaderProps) {
  return (
    <Container className="mb-3">
      <div className="flex items-center gap-2">
        <Icon size={20} />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </Container>
  );
}
