import React from "react";
import { Dashboard } from "../pages/Dashboard";
import { Inventory } from "../pages/Inventory";
import { Orders } from "../pages/Orders";
import { Users } from "../pages/Users/Users";
import { Drivers } from "../pages/Drivers/Drivers";
import { Customers } from "../pages/Customers/Customers";

export const routes = [
  {
    path: "dashboard",
    element: Dashboard,
    label: "Dashboard",
  },
  {
    path: "inventory",
    element: Inventory,
    label: "Inventory",
  },
  {
    path: "orders",
    element: Orders,
    label: "Orders",
  },
  {
    path: "adminUsers",
    element: Users,
    label: "Admin Users",
  },
  {
    path: "drivers",
    element: Drivers,
    label: "Drivers",
  },
  {
    path: "customers",
    element: Customers,
    label: "Customers",
  },
];

export const getRouteComponent = (path) => {
  const route = routes.find((r) => r.path === path);
  return route ? route.element : null;
};
