import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    disabled_color?: string;
    className?: string
}

const Button = ({text,className,disabled = false,disabled_color = 'bg-[#00346582]',...props}:ButtonProps) => {

  return (
    <button className={twMerge(`${disabled ? disabled_color : 'bg-primary-darker'} rounded-[10px] py-2 text-light font-semibold text-base `,className)}
    disabled={disabled}
    {...props}>
        {text}
    </button>
  )
}

export default Button