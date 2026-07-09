import { Input, Label } from "../atoms";

const FormGroup = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  id = "",
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormGroup;
