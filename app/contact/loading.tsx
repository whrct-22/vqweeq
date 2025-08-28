export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-12 w-full bg-muted rounded"></div>
        <div className="h-12 w-full bg-muted rounded"></div>
        <div className="h-32 w-full bg-muted rounded"></div>
        <div className="h-12 w-32 bg-muted rounded"></div>
      </div>
    </div>
  )
}