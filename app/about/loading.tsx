export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-6 w-full bg-muted rounded"></div>
        <div className="h-6 w-3/4 bg-muted rounded"></div>
        <div className="h-6 w-5/6 bg-muted rounded"></div>
      </div>
    </div>
  )
}