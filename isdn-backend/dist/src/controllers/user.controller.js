"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await user_service_1.default.getAllUsers();
            // Remove password from response
            const sanitizedUsers = users.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            res.json({
                success: true,
                data: sanitizedUsers,
                message: "Users retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await user_service_1.default.getUserById(id);
            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            res.json({
                success: true,
                data: userWithoutPassword,
                message: "User retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const newUser = await user_service_1.default.createUser(userData);
            // Remove password from response
            const { password, ...userWithoutPassword } = newUser;
            res.status(201).json({
                success: true,
                data: userWithoutPassword,
                message: "User created successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await user_service_1.default.updateUser(id, userData);
            // Remove password from response
            const { password, ...userWithoutPassword } = updatedUser;
            res.json({
                success: true,
                data: userWithoutPassword,
                message: "User updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await user_service_1.default.deleteUser(id);
            res.json({
                success: true,
                message: "User deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async changePassword(req, res, next) {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;
            await user_service_1.default.changePassword(id, oldPassword, newPassword);
            res.json({
                success: true,
                message: "Password changed successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async activateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updatedUser = await user_service_1.default.activateUser(id);
            // Remove password from response
            const { password, ...userWithoutPassword } = updatedUser;
            res.json({
                success: true,
                data: userWithoutPassword,
                message: "User activated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map