import React from "react";
import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { useColorScheme } from "nativewind";

interface LabelProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = "", ...props }) => {
  const labelStyles = twMerge(
    "mb-2 text-[16px] font-bold text-[#000] dark:text-[#fff]",
    className
  );

  return (
    <Text className={labelStyles} {...props}>
      {children}
    </Text>
  );
};

export { Label };
