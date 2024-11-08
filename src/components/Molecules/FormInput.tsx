
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';
import React, { forwardRef } from "react"
import { MaskProps } from '@react-input/mask';

interface FormInputProps {
    type: 'text' | 'number';
    placeholder?: string;
    label?: string; 
    mask?:MaskProps
    prefix?: string
    errorMessage?: string
    className?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({type,className,prefix,  placeholder,  label,mask,errorMessage, ...props},ref) => {
    return (
        <div className="flex flex-col gap-3">
          {label && <Label>{label}</Label>}
          <Input
            type={type}
            ref={ref}
            mask={mask}
            placeholder={placeholder}
            prefix={prefix}
            className={className}
            {...props}
          />    
          {errorMessage && <span className="text-red-color text-sm">{errorMessage}</span>}
        </div>
      );
}
)
export default FormInput