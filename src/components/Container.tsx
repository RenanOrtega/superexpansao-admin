export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-lg rounded p-5 ${className}`}>
      {children}
    </div>
  );
}
