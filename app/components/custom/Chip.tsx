'use client'

import React from 'react'

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <button
      className={`px-4 py-1 rounded-full text-sm transition-colors duration-300 cursor-pointer ${
        selected
          ? 'bg-neutral-900 text-white'
          : 'bg-zinc-200 text-gray-800 hover:bg-neutral-800 hover:text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Chip
