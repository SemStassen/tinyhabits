"use client";

import { useId } from "react";
import { Label } from "@/components";
import { Input as ShadInput } from "./shad";

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
      <ShadInput name={name} {...props} />
    </>
  );
}

export { Input };
