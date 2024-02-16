import { ReactNode } from "react";

type TextSpecificClassNames = {
  textSpecific: string;
  nonTextSpecific: string;
};

const combineClassNames = (classNamesArray: string[]): string => {
  return classNamesArray.join(" ");
};

export const classifyChild = (
  child: string | ReactNode | null
): "text" | "component" | "unknown" => {
  if (typeof child === "string") {
    return "text";
  } else if (typeof child === "object" && child !== null) {
    return "component";
  } else {
    return "unknown";
  }
};

export const separateTextClassNames = (
  classNamesString: string
): TextSpecificClassNames => {
  const classNamesArray = classNamesString.split(" ");

  const textSpecificClassNames: string[] = [];
  const nonTextSpecificClassNames: string[] = [];

  const isTextClassName = (className: string): any => {
    return (
      className.includes("text-") ||
      className.includes("font-") ||
      className.includes("leading-") ||
      className.includes("tracking-") ||
      className.includes("decoration-") ||
      className.includes("line-through") ||
      className.includes("underline") ||
      className.includes("no-underline") ||
      className.includes("uppercase") ||
      className.includes("lowercase") ||
      className.includes("capitalize") ||
      className.includes("normal-case") ||
      className.includes("list-") || // Add list-related classes
      className.includes("list-inside") ||
      className.includes("list-outside") ||
      className.match(/leading-\[\d+\]/) || // Matches leading-[n]
      className.match(/leading-\d+/) || // Matches leading-{n}
      className.includes("line-clamp-") || // Add line-clamp-related classes
      className.includes("line-clamp-none") ||
      className.includes("normal-nums") ||
      className.includes("ordinal") ||
      className.includes("slashed-zero") ||
      className.includes("lining-nums") ||
      className.includes("oldstyle-nums") ||
      className.includes("proportional-nums") ||
      className.includes("tabular-nums") ||
      className.includes("diagonal-fractions") ||
      className.includes("stacked-fractions") ||
      className.includes("italic") ||
      className.includes("not-italic") ||
      className.includes("antialiased") ||
      className.includes("subpixel-antialiased")
    );
  };

  classNamesArray.forEach((className) => {
    if (isTextClassName(className)) {
      textSpecificClassNames.push(className);
    } else {
      nonTextSpecificClassNames.push(className);
    }
  });

  return {
    textSpecific: combineClassNames(textSpecificClassNames),
    nonTextSpecific: combineClassNames(nonTextSpecificClassNames),
  };
};
