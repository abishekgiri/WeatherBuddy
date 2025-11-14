export default function ErrorState({ message }: { message: string }) {
  return <div className="card text-red-300 text-center">{message}</div>;
}
