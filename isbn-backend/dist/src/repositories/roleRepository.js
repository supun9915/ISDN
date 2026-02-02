"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
class RoleRepository {
    async findAll() {
        return await database_1.default.role.findMany({
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
    }
    async findById(id) {
        return await database_1.default.role.findUnique({
            where: { id: BigInt(id) },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        name: true,
                        active: true,
                    },
                },
            },
        });
    }
    async findByName(roleName) {
        return await database_1.default.role.findFirst({
            where: { roleName },
        });
    }
    async create(roleData) {
        return await database_1.default.role.create({
            data: {
                roleName: roleData.roleName,
                permissions: roleData.permissions || '{}'
            },
        });
    }
    async update(id, roleData) {
        return await database_1.default.role.update({
            where: { id: BigInt(id) },
            data: roleData,
        });
    }
    async delete(id) {
        return await database_1.default.role.delete({
            where: { id: BigInt(id) },
        });
    }
    async checkRoleInUse(id) {
        const count = await database_1.default.user.count({
            where: { roleId: BigInt(id) },
        });
        return count > 0;
    }
}
exports.default = new RoleRepository();
//# sourceMappingURL=roleRepository.js.map