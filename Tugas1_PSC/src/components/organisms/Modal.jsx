import { Button } from "../atoms";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Simpan",
  cancelText = "Batal",
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-lg p-6 ${sizeClasses[size]}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
