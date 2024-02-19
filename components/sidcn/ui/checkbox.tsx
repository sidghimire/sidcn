import { Check } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface CheckboxProps {
  className?: string;
  value?: boolean;
  disabled?: boolean;
  onValueChange?: (newValue: boolean) => void;
}

const Checkbox = ({
  className,
  value = false,
  onValueChange,
  disabled = false,
}: CheckboxProps) => {
  const { colorScheme } = useColorScheme();
  const [checked, setChecked] = useState(value);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    // Call the onValueChange prop if provided
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const variants = {
    baseClass: `h-7 w-7 rounded-md border border-gray-400 items-center justify-center ${
      checked && "bg-black dark:bg-white"
    }`,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.98}
      className={twMerge(variants.baseClass, className)}
      disabled={disabled}
      onPress={toggle}
    >
      {checked ? (
        <Check
          size={18}
          color={colorScheme == "light" ? "#fff" : "#000"}
          className={twMerge(className)}
        />
      ) : (
        <View className="h-[18px] w-[18px]"></View>
      )}
    </TouchableOpacity>
  );
};

export { Checkbox };
