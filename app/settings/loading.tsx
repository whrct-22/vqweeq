export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-4"></div>
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}