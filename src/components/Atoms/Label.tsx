import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children,className ,...props }) => {
  return (
    <label {...props} className={twMerge(`text-primary-darker font-normal text-xl}`,className)}>
      {children}
    </label>
  );
};

export default Label;
