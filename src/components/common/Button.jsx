import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  className = "",
  icon: Icon,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />}
      {children}
    </button>
  );
};
