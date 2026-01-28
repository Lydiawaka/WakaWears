"use client"

import { useRef, useState } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        className={`absolute inset-0 w-full h-full object-cover ${isVideoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      >
        <source src="/hero-fashion-video.mp4" type="video/mp4" />
        <source src="/hero-fashion-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Loading fallback */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Minimal overlay content */}
       <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="text-black space-y-6 px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-balance">
            Wakawears
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-yellow-900 opacity-90 max-w-2xl mx-auto">
            Fashion Forward. Community Driven.
          </p>
        </div>
      </div> 

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  )
}