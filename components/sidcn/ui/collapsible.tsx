import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface CollapsibleProps {
  children: React.ReactNode;
  show?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  height?: number;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  show = false,
  onOpenChange,
  height = 100,
}) => {
  const [showCollapsible, setshowCollapsible] = useState(show);
  const heightAnim = useRef(
    new Animated.Value(showCollapsible ? 1 : 0)
  ).current;

  const toggle = () => {
    const newShowCollapsible = !showCollapsible;
    setshowCollapsible(newShowCollapsible);
    Animated.timing(heightAnim, {
      toValue: newShowCollapsible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Notify the parent component about the change in open state
    if (onOpenChange) {
      onOpenChange(newShowCollapsible);
    }
  };

  const triggerElements: React.ReactElement[] = [];
  const contentElements: React.ReactElement[] = [];
  const otherElements: React.ReactElement[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "CollapsibleTrigger") {
        triggerElements.push(element);
      } else if (elementType === "CollapsibleContent") {
        contentElements.push(element);
      } else {
        otherElements.push(element);
      }
    } else {
      // Handle non-React elements if needed
    }
  });

  const trigger = React.cloneElement(triggerElements[0], {
    toggle,
    showCollapsible,
  });

  const contentHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentElements.length * height], // Adjust height as needed
  });

  return (
    <View className={twMerge("w-full")}>
      {trigger}
      <Animated.View
        style={{
          height: contentHeight,
          overflow: "hidden",
        }}
      >
        {contentElements}
      </Animated.View>
    </View>
  );
};

interface CollapsibleTriggerProps {
  showCollapsible?: boolean;
  toggle?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  showCollapsible,
  toggle,
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.95}
      className={twMerge(categorizedStyles.nonTextSpecific)}
    >
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <React.Fragment key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[16px] font-normal dark:text-[#fff] text-[#000]",
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
    </TouchableOpacity>
  );
};

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  className = "",
}) => {
  const categorizedStyles = separateTextClassNames(className);
  return (
    <View className={twMerge(categorizedStyles.nonTextSpecific)}>
      {React.Children.map(children, (child, index) => {
        const childType = classifyChild(child);

        return (
          <View key={index}>
            {childType === "text" && (
              <Text
                className={twMerge(
                  "text-[14px] dark:text-[#fff] text-[#212020] tracking-tight",
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
          </View>
        );
      })}
    </View>
  );
};
export { Collapsible, CollapsibleContent, CollapsibleTrigger };
