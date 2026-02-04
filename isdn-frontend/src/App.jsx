import React, { useState, useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { Orders } from "./pages/Orders";
import { Login } from "./pages/Login";
import { ToastContainer } from "./components/feedback/ToastContainer";
import { useToast } from "./hooks/useToast";
import {
  branches,
  products as initialProducts,
  orders as initialOrders,
  stats,
} from "./data/mockData";
import { apiAdapter } from "./services/apiAdapter";

// Mock User
const currentUser = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.m@islandlink.sys",
  role: "admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [currentBranchId, setCurrentBranchId] = useState("1");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const { toasts, addToast, removeToast } = useToast();

  // Initialize authentication state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedBranchId = apiAdapter.getCurrentBranchId();

    if (token) {
      setIsAuthenticated(true);
    }

    if (storedBranchId) {
      setCurrentBranchId(storedBranchId);
    }
  }, []);

  const currentBranch =
    branches.find((b) => b.id === currentBranchId) || branches[0];

  // Auth Handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
    const user = apiAdapter.getCurrentUser();
    const userBranchId = apiAdapter.getCurrentBranchId();

    if (userBranchId) {
      setCurrentBranchId(userBranchId);
    }

    addToast(
      "success",
      `Welcome back, ${user?.name || "User"}! You have successfully signed in.`,
    );
  };

  const handleLogout = () => {
    apiAdapter.logout();
    setIsAuthenticated(false);
    setActivePage("dashboard");
    addToast("info", "You have been signed out.");
  };

  // Handlers
  const handleSwitchBranch = (branchId) => {
    setCurrentBranchId(branchId);
    localStorage.setItem("branchId", branchId);
    addToast(
      "info",
      `Switched to ${branches.find((b) => b.id === branchId)?.name}`,
    );
  };

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setProducts([newProduct, ...products]);
    addToast("success", "Product added successfully to inventory");
  };

  const handleEditProduct = (product) => {
    addToast("info", `Editing ${product.name} (Demo only)`);
  };

  const handleDeleteProduct = (product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
      addToast("warning", "Product removed from inventory");
    }
  };

  const handleUpdateOrder = (order) => {
    addToast("info", `Updating order ${order.orderNumber} (Demo only)`);
  };

  const handleDeleteOrder = (order) => {
    if (confirm(`Cancel order ${order.orderNumber}?`)) {
      setOrders(
        orders.map((o) =>
          o.id === order.id
            ? {
                ...o,
                status: "cancelled",
              }
            : o,
        ),
      );
      addToast("error", `Order ${order.orderNumber} cancelled`);
    }
  };

  // Page Routing
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            stats={stats}
            recentOrders={orders}
            lowStockProducts={products.filter(
              (p) => p.status === "low_stock" || p.status === "out_of_stock",
            )}
            onNavigate={setActivePage}
          />
        );

      case "inventory":
        return (
          <Inventory
            products={products}
            branches={branches}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );

      case "orders":
        return (
          <Orders
            orders={orders}
            onUpdateStatus={handleUpdateOrder}
            onDeleteOrder={handleDeleteOrder}
          />
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-500">
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p>The {activePage} module is currently under development.</p>
          </div>
        );
    }
  };

  // Show Login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <>
      <MainLayout
        activePage={activePage}
        onNavigate={setActivePage}
        currentBranch={currentBranch}
        branches={branches}
        onSwitchBranch={handleSwitchBranch}
        onLogout={handleLogout}
        user={currentUser}
      >
        {renderPage()}
      </MainLayout>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
