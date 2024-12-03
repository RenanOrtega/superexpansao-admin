export default function CustomTag({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${className}`}>
      {text}
    </span>
  );
}
