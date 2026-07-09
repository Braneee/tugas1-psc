import { Button } from "../atoms";

const Form = ({
  onSubmit,
  children,
  title = "",
  submitText = "Login",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} {...props}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      )}

      <div className="space-y-4">{children}</div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2.5 text-base font-semibold"
        disabled={disabled}
      >
        {submitText}
      </Button>
    </form>
  );
};

export default Form;
