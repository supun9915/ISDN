/**
 * API Adapter for IslandLink System
 * Centralized API handling with authentication and error management
 */

const API_BASE_URL = "http://localhost:3100/isdn/api";

class ApiAdapter {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get authentication token from localStorage
   */
  getToken() {
    return localStorage.getItem("token");
  }

  /**
   * Set authentication token in localStorage
   */
  setToken(token) {
    localStorage.setItem("token", token);
  }

  /**
   * Remove authentication token from localStorage
   */
  removeToken() {
    localStorage.removeItem("token");
  }

  /**
   * Generic request handler
   */
  async request(endpoint, options = {}) {
    const token = this.getToken();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store token and user data in localStorage
    if (response.success && response.data) {
      this.setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("branchId", response.data.user.branchId);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("userRole", response.data.user.role.roleName);
    }

    return response;
  }

  /**
   * Logout user
   */
  logout() {
    this.removeToken();
    localStorage.removeItem("user");
    localStorage.removeItem("branchId");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Get current branch ID from localStorage
   */
  getCurrentBranchId() {
    return localStorage.getItem("branchId");
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

// Export singleton instance
export const apiAdapter = new ApiAdapter();
