import React from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";
import { separateTextClassNames, classifyChild } from "../utils/textFunction";

const Label = ({ children, className = "", ...props }) => {
  const childType = classifyChild(children);

  if (childType === "text") {
    return (
      <Text className={twMerge("text-sm m-1 text-gray-900 dark:text-gray-100", className)} {...props}>
        {children}
      </Text>
    );
  }

  // If it's a component, return it as is
  return children;
};

export default Label;
