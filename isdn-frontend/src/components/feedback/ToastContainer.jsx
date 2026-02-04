import React from "react";
import { Toast } from "./Toast";

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-16 sm:top-4 right-2 sm:right-4 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </div>
  );
}
