import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/feedback/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";

export function DriverUpdateModel({
  isOpen,
  onClose,
  onSubmit,
  user,
  roles,
  branches,
}) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roleId: "",
    branchId: "",
    contactNumber: "",
    vehicleNumber: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleCapacity: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "", // Don't pre-fill password
        roleId: user.roleId || "",
        branchId: user.branchId || "",
        contactNumber: user.contactNumber || "",
        vehicleNumber: user.vehicleNumber || "",
        vehicleType: user.vehicleType || "",
        vehicleBrand: user.vehicleBrand || "",
        vehicleCapacity: user.vehicleCapacity || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password is optional for updates
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.roleId) {
      newErrors.roleId = "Role is required";
    }

    if (!formData.branchId) {
      newErrors.branchId = "Branch is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    if (!formData.vehicleType.trim()) {
      newErrors.vehicleType = "Vehicle type is required";
    }

    if (!formData.vehicleBrand.trim()) {
      newErrors.vehicleBrand = "Vehicle brand is required";
    }

    if (!formData.vehicleCapacity.trim()) {
      newErrors.vehicleCapacity = "Vehicle capacity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      // Create update payload - only include password if it was changed
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      await onSubmit(user.id, updateData);
      setErrors({});
    } catch (error) {
      console.error("Error updating driver:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      roleId: "",
      branchId: "",
      contactNumber: "",
      vehicleNumber: "",
      vehicleType: "",
      vehicleBrand: "",
      vehicleCapacity: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Driver"
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Updating..." : "Update Driver"}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>

        {/* Username and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Username"
            name="username"
            placeholder="e.g. john_doe"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        {/* Password and Contact Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password (leave blank to keep current)"
            name="password"
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Contact Number"
            name="contactNumber"
            placeholder="e.g. 1234567890"
            value={formData.contactNumber}
            onChange={handleChange}
            error={errors.contactNumber}
          />
        </div>

        {/* Role and Branch - Read Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Role"
            name="role"
            value={user?.role?.roleName || "Driver"}
            disabled
            placeholder="Role"
          />
          <Input
            label="Branch"
            name="branch"
            value={user?.branch?.name || ""}
            disabled
            placeholder="Branch"
          />
        </div>

        {/* Vehicle Number and Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Vehicle Number"
            name="vehicleNumber"
            placeholder="e.g. ABC-1234"
            value={formData.vehicleNumber}
            onChange={handleChange}
            error={errors.vehicleNumber}
          />
          <Input
            label="Vehicle Type"
            name="vehicleType"
            placeholder="e.g. Van, Truck"
            value={formData.vehicleType}
            onChange={handleChange}
            error={errors.vehicleType}
          />
        </div>

        {/* Vehicle Brand and Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Vehicle Brand"
            name="vehicleBrand"
            placeholder="e.g. Toyota, Ford"
            value={formData.vehicleBrand}
            onChange={handleChange}
            error={errors.vehicleBrand}
          />
          <Input
            label="Vehicle Capacity"
            name="vehicleCapacity"
            placeholder="e.g. 1000 kg"
            value={formData.vehicleCapacity}
            onChange={handleChange}
            error={errors.vehicleCapacity}
          />
        </div>
      </form>
    </Modal>
  );
}
