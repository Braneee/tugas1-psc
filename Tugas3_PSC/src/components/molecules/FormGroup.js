import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

function FormGroup({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  id,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
}

export default FormGroup;
