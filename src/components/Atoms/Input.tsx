import {MaskProps, useMask } from "@react-input/mask";
import React, { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface InputProps {
    type: 'text' | 'number';
    placeholder?: string;
    mask?: MaskProps
    prefix?: string
    className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({type, className, placeholder,mask,prefix, ...props},ref) => {
    const maskRef = useMask(mask);

    return (
        <input
            type={type}
            placeholder={placeholder}
            ref={(el) => {
                if (mask) maskRef.current = el;
                return (typeof ref == "function") ? ref(el) : ref;
            }}
            className={twMerge(   "border rounded-lg w-full max-w-[678px] py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary placeholder-lighter-secondary sm:w-[500px] md:w-[600px] lg:w-[678px]",className)}
            prefix={prefix}
            {...props}
        />
    );
})

export default Input