import cn from "@/lib/utils/cn";

import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

interface submitButtonProps extends Omit<ButtonProps, "children"> {
  submitText: string;
  idleText?: string;
}

const buttonVariants = cva(
  "block rounded-md font-semibold disabled:bg-gray-400",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-500",
        success: "bg-green-600 text-white hover:bg-green-500",
        danger: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        default: "px-5 leading-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
});

function SubmitButton({ submitText, idleText, ...props }: submitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {pending ? idleText : submitText}
    </Button>
  );
}

export { Button, SubmitButton };
