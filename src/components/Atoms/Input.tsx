import { MaskProps, useMask } from "@react-input/mask";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  type: "text" | "number" | "password" | "email";
  placeholder?: string;
  mask?: MaskProps;
  prefix?: string;
  className?: string;
  value?: any;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, onChange, className, placeholder, mask, prefix, value, disabled, ...props }, ref) => {
    const maskRef = useMask(mask);

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        id={props.id}
        ref={(el) => {
          if (mask) maskRef.current = el;
          return typeof ref === "function" ? ref(el) : ref;
        }}
        className={twMerge(
          "border rounded-lg w-full max-w-[678px] py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary placeholder-lighter-secondary sm:w-[500px] md:w-[600px] lg:w-[678px]",
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
