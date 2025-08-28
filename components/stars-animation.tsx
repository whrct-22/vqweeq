"use client"

import { useEffect, useState } from "react"

export function StarsAnimation() {
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    // Generate stars only on client-side
    const newStars = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }))
    setStars(newStars)
  }, [])

  if (stars.length === 0) {
    return null // Don't render anything on server
  }

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </>
  )
}