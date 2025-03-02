'use client'

import React, { useState, useEffect } from 'react'

type PointerTooltipProps = {
  text: string | null
}

const PointerTooltip: React.FC<PointerTooltipProps> = ({ text }) => {
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.min(e.clientX + 10, window.innerWidth - 150)
      const y = Math.min(e.clientY + 10, window.innerHeight - 40)
      setPointerPosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!text) return null

  return (
    <div
      className='fixed z-50 px-4 py-2 text-white text-sm bg-neutral-800 rounded-2xl shadow-lg'
      style={{
        left: `${pointerPosition.x}px`,
        top: `${pointerPosition.y}px`,
      }}
    >
      {text}
    </div>
  )
}

export default PointerTooltip
