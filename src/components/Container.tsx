export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
}
