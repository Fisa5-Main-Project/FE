import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 text-[15px] outline-none border bg-white border-gray-300 rounded-[4px] focus:border-gray-400 disabled:text-gray-400 disabled:bg-gray-100 ${className || ''}`}
      {...props}
    />
  );
};

export default Input;
