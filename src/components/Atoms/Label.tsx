import React from 'react'
import { twMerge } from "tailwind-merge"

interface LabelProps {
  children: React.ReactNode
  className?: string
}

const Label = ({
    children,className
}:LabelProps) => {
  return (
    <label className={twMerge("text-xl text-light font-bold",className)}>
        {children}
    </label>
  )
}

export default Label