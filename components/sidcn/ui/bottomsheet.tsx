import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, ReactNode, ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { separateTextClassNames, classifyChild } from "../utils/textFunction";
import { twMerge } from "tailwind-merge";

interface BottomSheetProps {
  children:
    | ReactElement<BottomSheetTriggerProps>
    | ReactElement<BottomSheetContentProps>
    | ReactElement<any>[]; // Update this line based on your actual components
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const allChildren: {
    trigger: ReactElement[];
    content: ReactElement[];
    other: ReactElement[];
  } = React.Children.toArray(children).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        const elementType =
          (child.type as any).displayName || (child.type as any).name;

        if (elementType === "BottomSheetTrigger") {
          acc.trigger.push(child);
        } else if (elementType === "BottomSheetContent") {
          acc.content.push(child);
        } else {
          acc.other.push(child);
        }
      } else {
        // Handle non-React elements if needed
      }

      return acc;
    },
    { trigger: [], content: [], other: [] }
  );

  function toggle() {
    setOpen(!open);
  }

  const trigger =
    allChildren.trigger.length > 0 &&
    React.cloneElement(allChildren.trigger[0], { toggle });
  const content =
    allChildren.content.length > 0 &&
    React.cloneElement(allChildren.content[0], { open, toggle });
  return (
    <>
      <View className={` border-b-[#cfcfcf] dark:border-b-[#4f4f4f]`}>
        {trigger}
      </View>
      {content}
    </>
  );
};

interface BottomSheetContentProps {
  open?: boolean;
  toggle?: () => void;
  className?: string;
  height?: number;
  children?: ReactNode;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  open,
  toggle,
  className = "",
  height,
  children,
}) => {
  const categorizedStyles = separateTextClassNames(className);
  const translateY = useSharedValue(0);
  const animatedSheet = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            !open
              ? translateY.value
                ? -translateY.value
                : windowHeight / 2
              : 0,
            { duration: 500 }
          ),
        },
      ],
    };
  });
  return (
    <>
      {open && (
        <Pressable
          onPress={() => {
            translateY.value = height ? -height : -windowHeight / 2;
            //@ts-ignore
            toggle();
          }}
          className="absolute mx-auto"
          style={{ height: windowHeight, width: windowWidth }}
        >
          <Animated.View
            style={[
              {
                height: windowHeight,
                width: windowWidth,
              },
            ]}
          ></Animated.View>
        </Pressable>
      )}
      <Animated.View
        className={twMerge(
          ` rounded-t-[20px] absolute -bottom-10 bg-[#000] dark:bg-[#fff] p-4 z-50`,
          categorizedStyles.nonTextSpecific
        )}
        style={[
          {
            height: height ? height : windowHeight / 2,
            width: windowWidth,
            shadowColor: open ? "#000" : "#fff",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: open ? 200 : 0,
            elevation: 1,
          },
          animatedSheet,
        ]}
      >
        <View
          className={`bg-white dark:bg-[#7f7f7f] w-[100px] rounded-full h-1 mx-auto mb-4`}
        ></View>
        <Text
          className={twMerge(
            `text-[12px] text-[#fff] dark:text-[#000]`,
            categorizedStyles.textSpecific
          )}
        >
          {children}
        </Text>
      </Animated.View>
    </>
  );
};

interface BottomSheetTriggerProps {
  show?: boolean;
  toggle?: () => void;
  children?: ReactNode;
  className?: string;
}

const BottomSheetTrigger: React.FC<BottomSheetTriggerProps> = ({
  show,
  toggle,
  children,
  className,
}) => {
  const child: "text" | "component" | "unknown" = classifyChild(children);
  const classSeparation = separateTextClassNames(twMerge(className));

  return (
    <TouchableOpacity
      onPress={() => {
        toggle && toggle();
      }}
      activeOpacity={0.95}
      className={twMerge("py-1 px-1", classSeparation.nonTextSpecific)}
    >
      {child == "text" && (
        <Text
          className={twMerge(
            `text-[#000] dark:text-[#fff] text-[14px] font-medium`,
            classSeparation.textSpecific
          )}
        >
          {children}
        </Text>
      )}
      {child == "component" && children && children}
    </TouchableOpacity>
  );
};

export { BottomSheet, BottomSheetContent, BottomSheetTrigger };
