import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  collapsible?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  return (
    <View className={twMerge("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
      })}
    </View>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  height?: number;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  height = 50,
  className = "",
}) => {
  const [show, setShow] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setShow(!show);
    Animated.timing(heightAnim, {
      toValue: show ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const alertTriggerElements: React.ReactElement[] = [];
  const alertContentElements: React.ReactElement[] = [];
  const otherElements: React.ReactElement[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "AccordionTrigger") {
        alertTriggerElements.push(element);
      } else if (elementType === "AccordionContent") {
        alertContentElements.push(element);
      } else {
        otherElements.push(element);
      }
    } else {
      // Handle non-React elements if needed
    }
  });

  const trigger = React.cloneElement(alertTriggerElements[0], {
    toggle,
    show,
  });

  const contentHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, alertContentElements.length * height],
  });

  return (
    <View
      className={twMerge(
        "w-full border-b dark:border-b-[#cfcfcf] border-b-[#cfcfcf]",
        className
      )}
    >
      {trigger}
      <Animated.View
        style={{
          height: contentHeight,
          overflow: "hidden",
        }}
      >
        {alertContentElements}
      </Animated.View>
    </View>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={twMerge("px-1 pb-4", categorizedStyles.nonTextSpecific)}>
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
              <View className={categorizedStyles.textSpecific}>
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
interface AccordionTriggerProps {
  show?: boolean;
  toggle?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  show,
  toggle,
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.95}
      className={twMerge(
        "py-4 flex flex-row px-1",
        categorizedStyles.nonTextSpecific
      )}
    >
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[14px] font-normal dark:text-[#fff] text-[#000]",
                  categorizedStyles.textSpecific
                )}
              >
                {child}
              </Text>
            )}
            {childType === "component" && (
              <View className={categorizedStyles.textSpecific}>
                {React.cloneElement(child as React.ReactElement, {
                  variant: "primary",
                })}
              </View>
            )}
          </React.Fragment>
        );
      })}
      <View className="ml-auto my-auto">
        {show ? (
          <ChevronUp color="#6f6f6f" size={18} />
        ) : (
          <ChevronDown color="#9f9f9f" size={20} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
