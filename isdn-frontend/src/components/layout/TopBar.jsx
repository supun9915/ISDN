import React, { useState, useEffect } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { apiAdapter } from "../../services/apiAdapter";

export function TopBar({ user, onMenuClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(user);

  useEffect(() => {
    // Get user details from localStorage

    const userStr = localStorage.getItem("user");
    const storedUser = userStr ? JSON.parse(userStr) : null;

    if (storedUser) {
      setLoggedUser({
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        role: storedUser.role?.roleName || "admin", // Map from roleId or use storedUser.role.roleName
        avatar: null, // Fallback to passed user avatar,
      });
    }
  }, [user]);

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-30">
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50 flex items-center px-3 sm:hidden">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg -ml-1"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Desktop/Tablet Search */}
        <div className="relative max-w-md w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders, products, or customers..."
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-12 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <kbd className="hidden md:inline-flex items-center rounded border border-slate-200 px-2 font-sans text-xs font-medium text-slate-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold text-slate-900">
              {loggedUser?.name || "User"}
            </p>
            <p className="text-xs text-slate-500">
              {loggedUser?.role
                ? loggedUser.role.charAt(0).toUpperCase() +
                  loggedUser.role.slice(1)
                : "User"}
            </p>
          </div>
          <Avatar
            fallback={loggedUser?.name || "U"}
            src={loggedUser?.avatar}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
