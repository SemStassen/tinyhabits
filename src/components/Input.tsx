"use client";

import { useId } from "react";
import { Label } from "@/components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  name: string;
}

function Input({ label, name, ...props }: InputProps) {
  const labelId = useId();
  const inputId = useId();

  return (
    <>
      <Label id={labelId} htmlFor={inputId}>
        {label}
      </Label>
      <input id={inputId} name={name} aria-labelledby={labelId} {...props} />
    </>
  );
}

export default Input;
