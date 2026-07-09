const Input = ({
  type = "text",
  id = "",
  name = "",
  value = "",
  onChange = () => {},
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50 ${className}`}
    />
  );
};

export default Input;
