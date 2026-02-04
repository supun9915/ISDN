import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Car,
  Users,
  FileText,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react";

export function Sidebar({
  activePage,
  onNavigate,
  currentBranch,
  branches,
  onSwitchBranch,
  onLogout,
  isOpen = false,
  onClose,
}) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Package,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
    },
    {
      id: "deliveries",
      label: "Deliveries",
      icon: Truck,
    },
    {
      id: "fleet",
      label: "Fleet",
      icon: Car,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
    },
  ];

  return (
    <aside
      className={`
      fixed left-0 top-0 z-50 h-screen w-[280px] sm:w-[260px] bg-slate-900 text-slate-300 
      flex flex-col border-r border-slate-800
      transform transition-transform duration-300 ease-in-out
      lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Truck className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            IslandLink<span className="text-blue-500">.sys</span>
          </span>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Branch Switcher */}
      <div className="p-3 sm:p-4 border-b border-slate-800">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block px-2">
          Current Branch
        </label>
        <div className="relative">
          <select
            value={currentBranch.id}
            onChange={(e) => onSwitchBranch(e.target.value)}
            className="w-full appearance-none bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-3 pr-10 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer hover:bg-slate-750 transition-colors"
          >
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-2 sm:px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}
              `}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}
              />

              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
