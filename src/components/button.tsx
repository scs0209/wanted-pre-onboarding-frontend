import React, { FC } from "react";

interface Props {
  onClick: (e: any) => void;
  type: "button" | "submit";
  disabled: boolean;
  children: React.ReactNode;
  testId?: string;
}

const CustomButton: FC<Props> = ({
  onClick,
  type,
  disabled = false,
  children,
  testId,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default CustomButton;
