'use client'

import { useEffect, useRef } from 'react'

export default function HostProjects() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Load Tally script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    // Initialize Tally form when script is loaded
    script.onload = () => {
      if (iframeRef.current) {
        const src = iframeRef.current.getAttribute('data-tally-src')
        if (src) {
          iframeRef.current.setAttribute('src', src)
        }
      }
    }

    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Host Projects</h1>
      <div className="w-full h-[calc(100vh-200px)] relative">
        <iframe 
          ref={iframeRef}
          data-tally-src="https://tally.so/r/wovlEX" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          title="GET IT DONE"
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  )
} 