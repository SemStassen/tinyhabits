import cn from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  return (
    <button
      className={cn(
        "block rounded-md bg-indigo-600 px-5 font-semibold leading-10 text-white hover:bg-indigo-500",
      )}
    >
      {children}
    </button>
  );
}

export default Button;
