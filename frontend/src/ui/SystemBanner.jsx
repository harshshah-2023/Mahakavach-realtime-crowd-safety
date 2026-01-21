// ui/SystemBanner.jsx
export default function SystemBanner({ text, onClear }) {
  return (
    <div className="bg-gray-900 text-white px-5 py-2 flex items-center justify-between text-sm">
      <span>{text}</span>
      <button className="text-white/70 hover:text-white" onClick={onClear}>✕</button>
    </div>
  );
}
