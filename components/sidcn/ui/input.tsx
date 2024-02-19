import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { separateTextClassNames } from "../utils/textFunction";
import { useColorScheme } from "nativewind";

interface InputProps extends TextInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  const inputStyles = separateTextClassNames(
    twMerge(
      "p-3 py-4 border border-gray-200 dark:border-gray-500 rounded-md w-full text-[14px] placeholder:text-[#8f8f8f] placeholder:text-[14px] dark:text-[#cfcfcf] text-[#000] dark:text-[#fff]",
      type === "email" ? "text-[14px]" : "text-[16px]",
      className
    )
  );

  return (
    <TextInput
      className={twMerge(inputStyles.textSpecific, inputStyles.nonTextSpecific)}
      placeholder={placeholder}
      keyboardType={type === "email" ? "email-address" : "default"}
      autoCapitalize={'none'}
      {...props}
    />
  );
};

export { Input };
