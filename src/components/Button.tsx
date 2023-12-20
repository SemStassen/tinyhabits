import cn from "@/lib/utils/cn";

import { VariantProps, cva } from "class-variance-authority";
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

function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

function SubmitButton({ submitText, idleText, ...props }: submitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {pending ? idleText : submitText}
    </Button>
  );
}

export { Button, SubmitButton };
