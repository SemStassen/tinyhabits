import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

function cn(...className: ClassNameValue[]) {
  return twMerge(clsx(className));
}

export default cn;
