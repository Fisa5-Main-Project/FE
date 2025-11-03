import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // 활성화, 비활성화 스타일용
}

// 'isActive'로는 prop 시각적 상태 제어, 'disabled'는 실제 비활성화 상태 제어
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isActive = true,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-full py-3 font-semibold rounded-[4px] transition-colors",
        disabled
          ? "bg-gray-1 text-gray-2 cursor-not-allowed"
          : isActive
          ? "bg-primary text-white"
          : "bg-gray-1 text-gray-2"
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
