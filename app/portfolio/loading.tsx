export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-32 bg-muted rounded-lg"></div>
        <div className="h-32 bg-muted rounded-lg"></div>
        <div className="h-32 bg-muted rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-96 bg-muted rounded-lg"></div>
        <div className="h-96 bg-muted rounded-lg"></div>
      </div>
      <div className="h-64 bg-muted rounded-lg"></div>
    </div>
  )
}