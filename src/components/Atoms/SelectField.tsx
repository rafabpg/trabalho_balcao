import  { forwardRef } from "react"
import Label from './Label';


interface SelectProps {
    options: { value: string; label: string }[]; 
    label?: string; 
    placeholder?: string; 
    className?: string; 
    errorMessage?: string
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>(({  options,
    label,
    placeholder,
    className = '',errorMessage,...props
  }, ref) => {
  return (
    <div className={`flex flex-col ${className} gap-3`}>
    {label && <Label children={label}/>}
    <select
      ref={ref}
      className="border rounded-lg py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary"
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errorMessage && <span className="text-red-color text-sm">{errorMessage}</span>}
  </div>
  )
}
)
export default SelectField