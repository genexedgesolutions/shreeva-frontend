import React, { useEffect, useRef } from "react";
import { Toast } from "bootstrap";

const ToastNotification = ({ type, message, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toastInstance = new Toast(toastRef.current, {
        autohide: true,
        delay: 3000,
      });
      toastInstance.show();
    }
  }, [message]);

  const getToastClass = () => {
    switch (type) {
      case "success":
        return "text-bg-success";
      case "error":
        return "text-bg-danger";
      case "warning":
        return "text-bg-warning";
      default:
        return "text-bg-primary";
    }
  };

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref={toastRef}
        className={`toast ${getToastClass()} fade show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">
            {type === "success"
              ? "Success"
              : type === "error"
              ? "Error"
              : "Warning"}
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default ToastNotification;
