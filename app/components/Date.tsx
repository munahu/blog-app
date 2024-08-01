export default function Date({ createdAt }: { createdAt: Date }) {
  const month = createdAt.toDateString().split(" ")[1];
  const day = createdAt.toDateString().split(" ")[2];
  return (
    <p className="text-sm">
      <span className="mr-1">{month}</span>
      <span>{day}</span>
    </p>
  );
}
