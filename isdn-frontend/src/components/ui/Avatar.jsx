import React from "react";

export function Avatar({ src, alt, fallback, size = "md", className = "" }) {
  const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`relative inline-block rounded-full overflow-hidden bg-slate-100 flex-shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || fallback}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-700 font-semibold">
          {fallback.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
