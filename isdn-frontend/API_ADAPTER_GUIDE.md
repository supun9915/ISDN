# API Adapter Guide

## Overview

The API Adapter is a centralized service for handling all API communications in the IslandLink system. It provides authentication management, request handling, and localStorage integration.

## Setup

The API adapter is located at `src/services/apiAdapter.ts` and is exported as a singleton instance.

```typescript
import { apiAdapter } from "./services/apiAdapter";
```

## Authentication Flow

### 1. Login

```typescript
const handleLogin = async () => {
  try {
    const response = await apiAdapter.login({
      username: "kety",
      password: "kety123",
    });

    if (response.success) {
      // User is now logged in
      // Token and user data are automatically stored in localStorage
      console.log("User:", response.data.user);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### 2. Logout

```typescript
const handleLogout = () => {
  apiAdapter.logout();
  // All user data and token are cleared from localStorage
};
```

### 3. Get Current User

```typescript
const user = apiAdapter.getCurrentUser();
if (user) {
  console.log("Logged in as:", user.name);
  console.log("Branch:", user.branch.name);
  console.log("Role:", user.role.roleName);
}
```

### 4. Get Current Branch ID

```typescript
const branchId = apiAdapter.getCurrentBranchId();
console.log("Current branch:", branchId);
```

## LocalStorage Data

After successful login, the following data is stored in localStorage:

- `token`: JWT authentication token
- `user`: Complete user object (JSON string)
- `branchId`: User's branch ID
- `username`: User's username
- `userRole`: User's role name

## Making API Requests

### GET Request

```typescript
const fetchOrders = async () => {
  try {
    const response = await apiAdapter.get("/orders");
    console.log("Orders:", response.data);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};
```

### POST Request

```typescript
const createOrder = async (orderData) => {
  try {
    const response = await apiAdapter.post("/orders", orderData);
    console.log("Order created:", response.data);
  } catch (error) {
    console.error("Failed to create order:", error);
  }
};
```

### PUT Request

```typescript
const updateProduct = async (productId, productData) => {
  try {
    const response = await apiAdapter.put(
      `/products/${productId}`,
      productData,
    );
    console.log("Product updated:", response.data);
  } catch (error) {
    console.error("Failed to update product:", error);
  }
};
```

### PATCH Request

```typescript
const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiAdapter.patch(`/orders/${orderId}`, { status });
    console.log("Status updated:", response.data);
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};
```

### DELETE Request

```typescript
const deleteProduct = async (productId) => {
  try {
    const response = await apiAdapter.delete(`/products/${productId}`);
    console.log("Product deleted:", response.data);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};
```

## API Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "2",
      "username": "kety",
      "name": "Kety",
      "email": "kety@gmail.com",
      "branch": {
        "id": "1",
        "name": "Apple",
        "code": "APL"
      }
    }
  },
  "message": "Login successful"
}
```

## Authorization

The API adapter automatically includes the JWT token in the `Authorization` header for all authenticated requests:

```
Authorization: Bearer <token>
```

## Error Handling

Always wrap API calls in try-catch blocks:

```typescript
try {
  const response = await apiAdapter.get("/endpoint");
  // Handle success
} catch (error) {
  // Handle error
  console.error("API Error:", error);
}
```

## Configuration

The base API URL is configured in the adapter:

```typescript
const API_BASE_URL = "http://localhost:3100/isdn/api";
```

To change this, modify the `API_BASE_URL` constant in `src/services/apiAdapter.ts`.

## Best Practices

1. **Always check response.success** before accessing data
2. **Use try-catch blocks** for all API calls
3. **Handle errors gracefully** and show user-friendly messages
4. **Don't store sensitive data** in localStorage beyond what's necessary
5. **Clear localStorage** on logout using `apiAdapter.logout()`

## Adding New API Endpoints

To add a new API endpoint, simply use the appropriate method:

```typescript
// Example: Fetch inventory
const getInventory = async (branchId: string) => {
  return await apiAdapter.get(`/inventory?branchId=${branchId}`);
};

// Example: Create delivery
const createDelivery = async (deliveryData: any) => {
  return await apiAdapter.post("/deliveries", deliveryData);
};
```

No need to modify the adapter itself - just use the existing methods!
