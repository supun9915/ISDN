import React from "react";

export function Badge({ status, className = "" }) {
  const getStatusStyles = (s) => {
    switch (s.toLowerCase()) {
      case "active":
      case "in_stock":
      case "delivered":
      case "completed":
      case "paid":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
      case "processing":
      case "low_stock":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
      case "failed":
      case "out_of_stock":
      case "inactive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatLabel = (s) => {
    return s.replace(/_/g, " ").toUpperCase();
  };

  return (
    <span
      className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${getStatusStyles(status)}
      ${className}
    `}
    >
      {formatLabel(status)}
    </span>
  );
}
