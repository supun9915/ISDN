import React from "react";
import { Dashboard } from "../pages/Dashboard";
import { Inventory } from "../pages/Inventory";
import { Orders } from "../pages/Orders";
import { Users } from "../pages/Users/Users";

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
    path: "users",
    element: Users,
    label: "Users",
  },
];

export const getRouteComponent = (path) => {
  const route = routes.find((r) => r.path === path);
  return route ? route.element : null;
};
