import React from "react";

export function Card({ children, className = "", noPadding = false }) {
  return (
    <div
      className={`bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}
    >
      {noPadding ? children : <div className="p-4 sm:p-6">{children}</div>}
    </div>
  );
}
