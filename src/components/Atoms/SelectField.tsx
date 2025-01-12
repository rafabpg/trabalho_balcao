import React, { forwardRef, useEffect } from "react";
import Label from "./Label";
import { CategoryEnum } from "@/shared/enumsForm";

interface SelectProps {
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: any;
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      placeholder,
      className = "",
      errorMessage,
      defaultValue,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${className} gap-3`}>
        {label && <Label>{label}</Label>}
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
            <option key={option.value} value={option.value} selected={option.value === defaultValue}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default SelectField;
