import Swal from "sweetalert2";

/**
 * Helper to show a SweetAlert2 confirmation dialog.
 * @param {Object} options
 * @param {string} options.title - The title of the alert
 * @param {string} options.text - The text description
 * @param {string} options.icon - The icon (success, error, warning, info, question)
 * @param {string} options.confirmButtonText - Text for the confirm button
 * @param {string} options.cancelButtonText - Text for the cancel button
 * @param {string} options.confirmButtonColor - Color of confirm button
 * @param {string} options.cancelButtonColor - Color of cancel button
 * @returns {Promise<import('sweetalert2').SweetAlertResult>}
 */
export const showConfirmDialog = ({
  title = "Apakah Anda yakin?",
  text = "",
  icon = "warning",
  confirmButtonText = "Ya, Lanjutkan",
  cancelButtonText = "Batal",
  confirmButtonColor = "#2563eb", // Tailwind blue-600 (default theme)
  cancelButtonColor = "#6b7280", // Tailwind gray-500
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });
};
