import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full py-3 text-white font-semibold disabled:opacity-40 rounded-[4px] transition-colors ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
