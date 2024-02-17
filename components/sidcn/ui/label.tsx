import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { classifyChild } from '../utils/textFunction';

interface LabelProps extends TextProps {
  children: ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
  const childType = classifyChild(children);

  if (childType === 'text') {
    return (
      <Text
        className={twMerge('text-sm m-1 text-gray-900 dark:text-gray-100', className)}
        {...props}
      >
        {children}
      </Text>
    );
  }

  // If it's a component, return it as is
  return children as React.ReactElement;
};

export default Label;
