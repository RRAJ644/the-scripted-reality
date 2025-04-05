'use client'

import React from 'react'
import { Button } from '../ui/button'

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <Button
      variant={'default'}
      className={`rounded-full text-sm cursor-pointer hover:bg-zinc-200  ${
        selected
          ? 'bg-neutral-900 text-white hover:bg-neutral-900  hover:text-white'
          : 'bg-zinc-200 text-gray-800'
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default Chip
