import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string
    background_color?: string
}

const Button = ({onClick, text,background_color = 'bg-primary-darker'}:ButtonProps) => {
  return (
    <button onClick = {onClick} className={`${background_color} rounded-[10px] py-2 px-8 text-light font-semibold text-base`}>
        {text}
    </button>
  )
}

export default Button