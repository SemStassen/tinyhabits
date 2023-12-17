import { twMerge } from "tailwind-merge";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function Label({ children, ...props }: LabelProps) {
  return (
    <label className={twMerge("mb-0.5 block", props.className)} {...props}>
      {children}
    </label>
  );
}

export default Label;
