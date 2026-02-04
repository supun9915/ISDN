import React, { useState } from "react";
import { DataTable } from "../components/data/DataTable";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Search, Download, Filter } from "lucide-react";
import { orders as initialOrders } from "../data/mockData";

export function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleUpdateStatus = (order) => {
    console.log("Updating order:", order);
  };

  const handleDeleteOrder = (order) => {
    if (confirm(`Cancel order ${order.orderNumber}?`)) {
      setOrders(
        orders.map((o) =>
          o.id === order.id ? { ...o, status: "cancelled" } : o,
        ),
      );
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "orderNumber",
      header: "Order #",
      sortable: true,
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
    },
    {
      key: "items",
      header: "Items",
      sortable: true,
      hideOnMobile: true,
    },
    {
      key: "totalAmount",
      header: "Total",
      sortable: true,
      render: (val) =>
        `$${val.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}`,
    },
    {
      key: "deliveryDate",
      header: "Delivery",
      sortable: true,
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      render: (val) => <Badge status={val} />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Orders
          </h1>
          <p className="text-slate-500 mt-1 text-sm hidden sm:block">
            Manage and track customer orders.
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<Download className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search orders..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>

        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <Select
            options={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Processing" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs sm:text-sm text-slate-500">
        Showing {filteredOrders.length} of {orders.length} orders
      </p>

      <DataTable
        data={filteredOrders}
        columns={columns}
        keyField="id"
        onEdit={handleUpdateStatus}
        onDelete={handleDeleteOrder}
      />
    </div>
  );
}
