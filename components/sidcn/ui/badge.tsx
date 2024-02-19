import React, { ReactNode } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface BadgeProps extends TouchableOpacityProps {
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

const Badge: React.FC<BadgeProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const variants = {
    baseClass: "p-2 px-4 fit-content rounded-full text-lg items-center justify-center",
    primary: "dark:text-black text-white bg-black dark:bg-white",
    secondary:
      "text-gray-300 dark:text-white bg-gray-200 dark:bg-[#1d1d20] text-black",
    destructive: "text-white dark:bg-[#6b1117] bg-[#d10e1d]",
    outline:
      "text-black dark:text-gray-100 border border-gray-200 dark:border-gray-700",
    ghost: "text-black dark:text-white bg-transparent",
    link: "text-black dark:text-white underline",
  };

  const classSeparation = separateTextClassNames(
    twMerge(variants.baseClass, variants[variant], className)
  );

  const childType: "text" | "component" | "unknown" = classifyChild(children);

  return (
    <TouchableOpacity
      activeOpacity={0.96}
      className={classSeparation.nonTextSpecific}
      {...props}
    >
      {childType === "text" && (
        <Text className={twMerge(classSeparation.textSpecific)}>{children}</Text>
      )}
      {childType === "component" && <>{children}</>}
    </TouchableOpacity>
  );
};

export { Badge };
