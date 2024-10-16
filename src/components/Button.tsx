import React from 'react'

interface ButtonProps {
    text: string
    background_color?: string
}

const Button = ({text,background_color = 'bg-primary-darker'}:ButtonProps) => {
  return (
    <button className={`${background_color} rounded-[10px] py-2 px-8 text-light font-semibold text-base`}>
        {text}
    </button>
  )
}

export default Button