import React, { useState } from "react";
import { DataTable } from "../components/data/DataTable";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/feedback/Modal";
import { Plus, Search, Filter } from "lucide-react";
import { branches, products as initialProducts } from "../data/mockData";

export function Inventory() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch =
      filterBranch === "all" || product.branchId === filterBranch;
    const matchesStatus =
      filterStatus === "all" || product.status === filterStatus;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const columns = [
    {
      key: "code",
      header: "Code",
      sortable: true,
    },
    {
      key: "name",
      header: "Product",
      sortable: true,
    },
    {
      key: "branchId",
      header: "Branch",
      sortable: true,
      hideOnMobile: true,
      render: (id) => branches.find((b) => b.id === id)?.name || id,
    },
    {
      key: "quantity",
      header: "Qty",
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      hideOnMobile: true,
      render: (val) => `$${val.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      render: (val) => <Badge status={val} />,
    },
  ];

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setProducts([newProduct, ...products]);
  };

  const handleEditProduct = (product) => {
    console.log("Editing product:", product);
  };

  const handleDeleteProduct = (product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    handleAddProduct({
      name: "New Product Demo",
      code: `PRD-${Math.floor(Math.random() * 1000)}`,
      quantity: 100,
      status: "in_stock",
      branchId: "1",
      price: 0,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Inventory
          </h1>
          <p className="text-slate-500 mt-1 text-sm hidden sm:block">
            Track stock levels across all distribution centers.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Add Stock
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        {/* Search + Filter Toggle (Mobile) */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
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

        {/* Filter Dropdowns - Always visible on tablet+, toggle on mobile */}
        <div
          className={`grid grid-cols-2 gap-3 ${showFilters ? "block" : "hidden"} sm:grid`}
        >
          <Select
            options={[
              { value: "all", label: "All Branches" },
              ...branches.map((b) => ({
                value: b.id,
                label: b.name,
              })),
            ]}
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          />
          <Select
            options={[
              { value: "all", label: "All Statuses" },
              { value: "in_stock", label: "In Stock" },
              { value: "low_stock", label: "Low Stock" },
              { value: "out_of_stock", label: "Out of Stock" },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs sm:text-sm text-slate-500">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <DataTable
        data={filteredProducts}
        columns={columns}
        keyField="id"
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Add Stock Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Stock Item"
        maxWidth="max-w-md sm:max-w-lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>Add Product</Button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Product Code" placeholder="e.g. PRD-001" />
            <Input label="Category" placeholder="e.g. Supplies" />
          </div>
          <Input label="Product Name" placeholder="Enter product name" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="RDC Branch"
              options={branches.map((b) => ({
                value: b.id,
                label: b.name,
              }))}
            />
            <Input label="Initial Quantity" type="number" placeholder="0" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Unit Price"
              type="number"
              step="0.01"
              placeholder="0.00"
            />
            <Select
              label="Initial Status"
              options={[
                { value: "in_stock", label: "In Stock" },
                { value: "pending", label: "Pending Arrival" },
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
