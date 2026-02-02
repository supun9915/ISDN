"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roleRepository_1 = __importDefault(require("../repositories/roleRepository"));
class RoleService {
    async getAllRoles() {
        return await roleRepository_1.default.findAll();
    }
    async getRoleById(id) {
        const role = await roleRepository_1.default.findById(id);
        if (!role) {
            throw new Error("Role not found");
        }
        return role;
    }
    async createRole(roleData) {
        // Check if role with the same name already exists
        const existingRole = await roleRepository_1.default.findByName(roleData.roleName);
        if (existingRole) {
            throw new Error("Role with this name already exists");
        }
        return await roleRepository_1.default.create(roleData);
    }
    async updateRole(id, roleData) {
        await this.getRoleById(id);
        // If roleName is being updated, check if it's already in use by another role
        if (roleData.roleName) {
            const existingRole = await roleRepository_1.default.findByName(roleData.roleName);
            if (existingRole && existingRole.id !== BigInt(id)) {
                throw new Error("Role name is already in use by another role");
            }
        }
        return await roleRepository_1.default.update(id, roleData);
    }
    async deleteRole(id) {
        await this.getRoleById(id);
        // Check if role is being used by any users
        const isInUse = await roleRepository_1.default.checkRoleInUse(id);
        if (isInUse) {
            throw new Error("Cannot delete role that is assigned to users. Please reassign users first.");
        }
        return await roleRepository_1.default.delete(id);
    }
    async activateRole(id) {
        await this.getRoleById(id);
        return await roleRepository_1.default.update(id, { active: true });
    }
    async deactivateRole(id) {
        await this.getRoleById(id);
        return await roleRepository_1.default.update(id, { active: false });
    }
}
exports.default = new RoleService();
//# sourceMappingURL=roleService.js.map