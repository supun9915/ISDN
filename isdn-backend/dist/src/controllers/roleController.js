"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roleService_1 = __importDefault(require("../services/roleService"));
class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const roles = await roleService_1.default.getAllRoles();
            res.json({
                success: true,
                data: roles,
                message: "Roles retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getRoleById(req, res, next) {
        try {
            const { id } = req.params;
            const role = await roleService_1.default.getRoleById(id);
            res.json({
                success: true,
                data: role,
                message: "Role retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createRole(req, res, next) {
        try {
            const roleData = req.body;
            // Validate required fields
            if (!roleData.roleName) {
                res.status(400).json({
                    success: false,
                    message: "Role name is required",
                });
                return;
            }
            const newRole = await roleService_1.default.createRole(roleData);
            res.status(201).json({
                success: true,
                data: newRole,
                message: "Role created successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateRole(req, res, next) {
        try {
            const { id } = req.params;
            const roleData = req.body;
            const updatedRole = await roleService_1.default.updateRole(id, roleData);
            res.json({
                success: true,
                data: updatedRole,
                message: "Role updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteRole(req, res, next) {
        try {
            const { id } = req.params;
            await roleService_1.default.deleteRole(id);
            res.json({
                success: true,
                message: "Role deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async activateRole(req, res, next) {
        try {
            const { id } = req.params;
            const updatedRole = await roleService_1.default.activateRole(id);
            res.json({
                success: true,
                data: updatedRole,
                message: "Role activated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deactivateRole(req, res, next) {
        try {
            const { id } = req.params;
            const updatedRole = await roleService_1.default.deactivateRole(id);
            res.json({
                success: true,
                data: updatedRole,
                message: "Role deactivated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new RoleController();
//# sourceMappingURL=roleController.js.map