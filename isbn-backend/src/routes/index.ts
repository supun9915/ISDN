import express, { Application } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import branchRoutes from "./branch.routes";

const api: Application = express();

api.use("/auth", authRoutes);
api.use("/users", userRoutes);
api.use("/roles", roleRoutes);
api.use("/branches", branchRoutes);

export default api;
