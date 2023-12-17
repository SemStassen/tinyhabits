import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function mc(className: string) {
  return twMerge(clsx(className));
}

export default mc;
