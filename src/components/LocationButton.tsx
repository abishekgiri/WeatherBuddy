export default function LocationButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn-ghost w-full md:w-auto">
      Use my location
    </button>
  );
}
