"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface submitButtonProps extends ButtonProps {
  submitText: string;
  idleText?: string;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-stone-50 shadow hover:bg-stone-900/90",
        destructive: "bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90",
        outline:
          "border border-stone-200 bg-white shadow-sm hover:bg-stone-100 hover:text-stone-900",
        secondary:
          "bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-100/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-stone-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

function SubmitButton({ submitText, idleText, ...props }: submitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {pending ? idleText : submitText}
    </Button>
  );
}

export { Button, SubmitButton, buttonVariants };
