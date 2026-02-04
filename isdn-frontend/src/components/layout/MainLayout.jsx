import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function MainLayout({
  children,
  activePage,
  onNavigate,
  currentBranch,
  branches,
  onSwitchBranch,
  onLogout,
  user,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        currentBranch={currentBranch}
        branches={branches}
        onSwitchBranch={onSwitchBranch}
        onLogout={onLogout}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        <TopBar user={user} onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
