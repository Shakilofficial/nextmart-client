import React, { ReactNode } from "react";

interface NContainerProps {
  children: ReactNode;
  className?: string;
}

const NContainer = ({ children, className = "" }: NContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default NContainer;