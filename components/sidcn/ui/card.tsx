import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface CardProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  const cardHeaderElements: React.ReactElement[] = [];
  const cardContentElements: React.ReactElement[] = [];
  const cardFooterElements: React.ReactElement[] = [];
  const otherElements: React.ReactElement[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "CardHeader") {
        cardHeaderElements.push(element);
      } else if (elementType === "CardContent") {
        cardContentElements.push(element);
      } else if (elementType === "CardFooter") {
        cardFooterElements.push(element);
      } else {
        otherElements.push(element);
      }
    } else {
      // Handle non-React elements if needed
    }
  });
  return (
    <View
      className={twMerge(
        "w-full flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg p-4 py-5",
        className
      )}
    >
      <>{cardHeaderElements[0]}</>
      <>{cardContentElements[0]}</>
      <>{cardFooterElements[0]}</>
    </View>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  const cardTitleElement: React.ReactElement[] = [];
  const cardDescriptionElement: React.ReactElement[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "CardTitle") {
        cardTitleElement.push(element);
      } else if (elementType === "CardDescription") {
        cardDescriptionElement.push(element);
      } else {
      }
    } else {
    }
  });
  return (
    <View className={twMerge("px-1 pb-4 flex flex-col", className)}>
      <>{cardTitleElement[0]}</>
      <>{cardDescriptionElement[0]}</>
    </View>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={twMerge(className)}>
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[11px] dark:text-[#fff] text-[#212020] tracking-tight",
                  categorizedStyles.textSpecific
                )}
              >
                {child}
              </Text>
            )}
            {childType === "component" && (
              <View className={categorizedStyles.nonTextSpecific}>
                {React.cloneElement(child as React.ReactElement, {
                  variant: "primary",
                })}
              </View>
            )}
            {/* Add more conditions as needed */}
          </React.Fragment>
        );
      })}
    </View>
  );
};
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {    
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={twMerge('mt-4',className)}>
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[11px] dark:text-[#fff] text-[#212020] tracking-tight",
                  categorizedStyles.textSpecific
                )}
              >
                {child}
              </Text>
            )}
            {childType === "component" && (
              <View className={categorizedStyles.nonTextSpecific}>
                {React.cloneElement(child as React.ReactElement, {
                  variant: "primary",
                })}
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={categorizedStyles.nonTextSpecific}>
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[28px] tracking-normal font-bold dark:text-[#efefef] text-[#212020]",
                  categorizedStyles.textSpecific
                )}
              >
                {child}
              </Text>
            )}
            {childType === "component" && (
              <>
                {React.cloneElement(child as React.ReactElement, {
                  variant: "primary",
                })}
              </>
            )}
            {/* Add more conditions as needed */}
          </React.Fragment>
        );
      })}
    </View>
  );
};
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={categorizedStyles.nonTextSpecific}>
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[16px] mt-1 dark:text-[#cfcfcf] text-[#413e3e] font-light tracking-wide",
                  categorizedStyles.textSpecific
                )}
              >
                {child}
              </Text>
            )}
            {childType === "component" && (
              <>
                {React.cloneElement(child as React.ReactElement, {
                  variant: "primary",
                })}
              </>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
};
