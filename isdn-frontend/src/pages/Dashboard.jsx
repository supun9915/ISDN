import React from "react";
import { StatsCard } from "../components/data/StatsCard";
import { DataTable } from "../components/data/DataTable";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ArrowRight, AlertTriangle } from "lucide-react";

export function Dashboard({
  stats,
  recentOrders,
  lowStockProducts,
  onNavigate,
}) {
  const orderColumns = [
    {
      key: "orderNumber",
      header: "Order #",
    },
    {
      key: "customerName",
      header: "Customer",
      hideOnMobile: true,
    },
    {
      key: "totalAmount",
      header: "Total",
      render: (val) => `$${val.toLocaleString()}`,
    },
    {
      key: "status",
      header: "Status",
      render: (val) => <Badge status={val} />,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Welcome back, here's what's happening today.
        </p>
      </div>

      {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} metric={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Recent Orders
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("orders")}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
            </Button>
          </div>
          <DataTable
            data={recentOrders.slice(0, 5)}
            columns={orderColumns}
            keyField="id"
          />
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Low Stock Alerts
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("inventory")}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Manage
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
                >
                  <div className="p-1.5 sm:p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Code: {product.code}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-bold text-red-600">
                      {product.quantity} left
                    </p>
                    <p className="text-xs text-slate-400 hidden sm:block">
                      Reorder now
                    </p>
                  </div>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <div className="p-6 sm:p-8 text-center text-slate-500 text-sm">
                  No low stock alerts. Good job!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
