import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// 'isActive'로는 prop 시각적 상태 제어, 'disabled'는 실제 비활성화 상태 제어
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-full py-3 font-semibold rounded-[4px] transition-colors",
        disabled
          ? "bg-gray-1 text-gray-2 cursor-not-allowed"
          : "bg-primary text-white",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
