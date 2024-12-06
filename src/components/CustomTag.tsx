import { Badge } from "./ui/badge";

export default function CustomTag({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return <Badge className={className}>{text}</Badge>;
}
