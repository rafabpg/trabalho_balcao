import React from 'react'

interface FormCardProps {
    children: React.ReactNode
    onSubmit?: (data: any)=>void
}

const FormCard = ({children,onSubmit}: FormCardProps ) => {
  return (
    <form className='flex flex-col items-center px-40 bg-secondary rounded-2xl py-5 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] gap-5' onSubmit={onSubmit}>
        {children}
    </form>
  )
}

export default FormCard