export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-muted rounded mb-2"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-64 bg-muted rounded"></div>
          <div className="h-10 w-32 bg-muted rounded"></div>
          <div className="h-10 w-32 bg-muted rounded"></div>
          <div className="h-10 w-24 bg-muted rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg"></div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="h-10 w-64 bg-muted rounded"></div>
        <div className="h-96 bg-muted rounded-lg"></div>
      </div>
    </div>
  )
}
