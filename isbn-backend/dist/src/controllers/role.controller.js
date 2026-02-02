"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_service_1 = __importDefault(require("../services/role.service"));
class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const roles = await role_service_1.default.getAllRoles();
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
            const role = await role_service_1.default.getRoleById(id);
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
}
exports.default = new RoleController();
//# sourceMappingURL=role.controller.js.map