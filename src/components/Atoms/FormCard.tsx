import React from 'react'
import { twMerge } from 'tailwind-merge'

interface FormCardProps {
    children: React.ReactNode
    onSubmit?: (data: any)=>void
    className?: string
}

const FormCard = ({children,onSubmit,className}: FormCardProps ) => {
  return (
    <form className={twMerge('flex flex-col items-start justify-start px-7 md:px-10 lg:px-20 bg-secondary rounded-2xl py-5 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] gap-5',className)} onSubmit={onSubmit}>
        {children}
    </form>
  )
}

export default FormCard