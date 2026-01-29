export default function StationCardSkeleton() {
  return (
    <div className="relative rounded-2xl bg-white border border-gray-200 p-5 overflow-hidden">
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-gray-100/70 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 rounded-md bg-gray-200" />
        <div className="h-3 w-3 rounded-full bg-gray-300" />
      </div>

      {/* Crowd status */}
      <div className="h-4 w-40 rounded bg-gray-200 mb-3" />

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}
