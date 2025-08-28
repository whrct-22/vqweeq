export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 bg-muted rounded"></div>
        <div className="h-10 w-32 bg-muted rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}