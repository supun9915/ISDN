import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Layers } from "lucide-react";
import { Button } from "../components/ui/Button";
import { apiAdapter } from "../services/apiAdapter";

export function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiAdapter.post("/auth/login", {
        username,
        password,
      });

      if (response.success && response.data) {
        // Store token and user data in localStorage
        apiAdapter.setToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("branchId", response.data.user.branchId);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("userRole", response.data.user.role.roleName);

        // Login successful, navigate to dashboard
        onLogin();
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Blue Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 relative overflow-hidden">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

        {/* Centered Logo & Brand */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-blue-900/30 mb-6">
            <Layers className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">
            IslandLink
          </h1>
          <p className="text-blue-200 mt-2 text-sm">
            Centralized Sales & Distribution System
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="bg-blue-600 rounded-2xl p-3 mb-4">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-slate-900 text-2xl font-bold">IslandLink</h1>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome back
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Please sign in to your account to continue
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="outline"
                className="w-full h-12 text-base font-medium mt-2"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2024 IslandLink Systems. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
