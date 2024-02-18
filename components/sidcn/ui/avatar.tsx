import { View, Text, Image, ImageProps } from "react-native";
import React, { useState, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { classifyChild, separateTextClassNames } from "../utils/textFunction";

interface AvatarProps {
  children: ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({ children }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log("error");
    setImageError(true);
  };

  const avatarImageElement: React.ReactNode[] = [];
  const avatarFallBackElement: React.ReactNode[] = [];

  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const elementType =
        (element.type as any).displayName || (element.type as any).name;

      if (elementType === "AvatarImage") {
        avatarImageElement.push(
          //@ts-ignore
          React.cloneElement(element, { handleImageError }) // pass the handler as a prop
        );
      } else if (elementType === "AvatarFallback") {
        avatarFallBackElement.push(element);
      }
    } else {
      // Handle non-React elements if needed
    }
  });

  return (
    <>
      {!imageError ? (
        <>{avatarImageElement[0]}</>
      ) : (
        <>{avatarFallBackElement[0]}</>
      )}
    </>
  );
};

interface AvatarImageProps extends ImageProps {
  className?: string;
  handleImageError: () => void; // define the prop
  // Other AvatarImage specific props...
}

const AvatarImage: React.FC<AvatarImageProps> = ({
  className,
  handleImageError,
  ...props
}) => {
  return (
    <Image
      className={twMerge("h-12 w-12 rounded-full", className)}
      onError={handleImageError}
      {...props}
    />
  );
};

interface AvatarFallbackProps {
  className?: string;
  children: ReactNode;
  // Other View props...
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className,
  children,
  ...props
}) => {
  const child: "text" | "component" | "unknown" = classifyChild(children);
  const classSeparation = separateTextClassNames(twMerge(className));

  return (
    <View
      className={twMerge(
        "h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 items-center justify-center",
        classSeparation.nonTextSpecific
      )}
      {...props}
    >
      {child === "text" && (
        <Text
          className={twMerge(
            "text-black dark:text-white",
            classSeparation.textSpecific
          )}
        >
          {children}
        </Text>
      )}
      {child === "component" && <>{children}</>}
    </View>
  );
};

export { Avatar, AvatarImage, AvatarFallback };
