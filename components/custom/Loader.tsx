import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: number
  className?: string
}

export function Loader({ size = 24, className }: LoaderProps) {
  return (
    <div
      className={cn(
        'border-4 border-t-transparent border-neutral-900 rounded-full animate-spin',
        className
      )}
      style={{ width: size, height: size }}
    />
  )
}
