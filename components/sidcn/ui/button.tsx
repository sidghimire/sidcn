import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface ButtonProps extends TouchableOpacityProps {
  className?: string;
  children: string | ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const classSeparation = separateTextClassNames(
    twMerge(variants.baseClass, variants[variant], className)
  );
  const child: "text" | "component" | "unknown" = classifyChild(children);
  return (
    <TouchableOpacity
      activeOpacity={0.96}
      className={classSeparation.nonTextSpecific}
      {...props}
    >
      {child == "text" && (
        <Text className={classSeparation.textSpecific}>{children}</Text>
      )}
      {child == "component" && <>{children}</>}
    </TouchableOpacity>
  );
};

const variants = {
  baseClass: "p-3 px-4 rounded-md item-center justify-center",
  primary: "dark:text-black text-white bg-black dark:bg-white",
  secondary:
    "text-gray-300 dark:text-white bg-gray-200 dark:bg-[#1d1d20] text-black",
  destructive: "text-white dark:bg-[#6b1117] bg-[#d10e1d]",
  outline:
    "text-black dark:text-gray-100 border border-gray-200 dark:border-gray-700",
  ghost: "text-black dark:text-white bg-transparent",
  link: "text-black dark:text-white underline",
};

export default Button;
