const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-blue-500/10 active:scale-98",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-98",
  warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm active:scale-98",
  info: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-98",
  danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-98",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4.5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-base rounded-2xl",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`transition-all duration-200 font-semibold focus:outline-none cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
