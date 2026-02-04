import React from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export function Toast({ toast, onDismiss }) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div
      className={`
      flex items-start p-3 sm:p-4 mb-2 sm:mb-3 rounded-lg border shadow-md 
      w-[calc(100vw-2rem)] sm:w-80 max-w-sm
      transition-all duration-300 animate-in slide-in-from-right
      ${styles[toast.type]}
    `}
    >
      <div className="flex-shrink-0 mr-2 sm:mr-3">{icons[toast.type]}</div>
      <div className="flex-1 text-xs sm:text-sm font-medium pr-2">
        {toast.message}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 focus:outline-none p-0.5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
