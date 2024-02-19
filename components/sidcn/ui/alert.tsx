import { View, Text } from "react-native";
import React from "react";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";
import { twMerge } from "tailwind-merge";

interface AlertProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const alertTitleElements: React.ReactElement[] = [];
  const alertDescriptionElements: React.ReactElement[] = [];
  const otherElements: React.ReactElement[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "AlertTitle") {
        alertTitleElements.push(element);
      } else if (elementType === "AlertDescription") {
        alertDescriptionElements.push(element);
      } else {
        otherElements.push(element);
      }
    } else {
      // Handle non-React elements if needed
    }
  });

  const classSeparation = twMerge(
    variants.baseClass,
    //@ts-expect-error
    variants[variant],
    className
  );

  return (
    <View className={classSeparation} {...props}>
      <View className="flex flex-row my-auto">
        {otherElements.length > 0 && (
          <View className="mr-3">{otherElements[0]}</View>
        )}
        <View className="flex flex-col flex-1">
          {React.cloneElement(alertTitleElements[0], { variant })}
          <View className="mt-1">
            {React.cloneElement(alertDescriptionElements[0], { variant })}
          </View>
        </View>
      </View>
    </View>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}

const AlertTitle: React.FC<AlertTitleProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const child = classifyChild(children);
  const classSeparation = separateTextClassNames(
    //@ts-expect-error
    twMerge(titleVariant[variant], className)
  );

  return (
    <View className={classSeparation.nonTextSpecific} {...props}>
      {child === "text" && (
        <Text className={classSeparation.textSpecific}>{children}</Text>
      )}
      {child === "component" && <>{children}</>}
    </View>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const child = classifyChild(children);
  const classSeparation = separateTextClassNames(
    twMerge(
      descriptionVariant.baseClass,
      //@ts-expect-error
      descriptionVariant[variant],
      className
    )
  );

  return (
    <View className={classSeparation.nonTextSpecific} {...props}>
      {child === "text" && (
        <Text className={classSeparation.textSpecific}>{children}</Text>
      )}
      {child === "component" && <>{children}</>}
    </View>
  );
};

const variants = {
  baseClass: "rounded-lg px-[14px] py-[16px] w-full",
  primary: "border border-gray-300 dark:border-gray-700",
  destructive: "border border-red-300 dark:border-red-700",
};

const titleVariant = {
  baseClass: "rounded-lg px-[14px] py-[16px] w-full",
  primary: "dark:text-white",
  destructive: "text-red-600 font-medium",
};

const descriptionVariant = {
  baseClass: "text-[12px]",
  primary: "dark:text-white",
  destructive: "text-red-600",
};

export { Alert, AlertTitle, AlertDescription };
