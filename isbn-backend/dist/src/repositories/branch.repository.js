"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
class BranchRepository {
    async findAll() {
        return await database_1.default.branch.findMany({
            include: {
                _count: {
                    select: {
                        users: true,
                        assignedCustomers: true,
                        vehicles: true,
                        inventories: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        return await database_1.default.branch.findUnique({
            where: { id: BigInt(id) },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        name: true,
                        contactNumber: true,
                        active: true,
                    },
                },
                assignedCustomers: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        name: true,
                        businessName: true,
                        customerCode: true,
                        active: true,
                    },
                },
                vehicles: {
                    select: {
                        id: true,
                        vehicleNumber: true,
                        vehicleType: true,
                        brand: true,
                        capacityKg: true,
                    },
                },
            },
        });
    }
    async findByCode(code) {
        return await database_1.default.branch.findUnique({
            where: { code },
        });
    }
    async create(branchData) {
        return await database_1.default.branch.create({
            data: branchData,
        });
    }
    async update(id, branchData) {
        return await database_1.default.branch.update({
            where: { id: BigInt(id) },
            data: branchData,
        });
    }
    async delete(id) {
        return await database_1.default.branch.delete({
            where: { id: BigInt(id) },
        });
    }
    async checkBranchInUse(id) {
        const userCount = await database_1.default.user.count({
            where: {
                OR: [{ branchId: BigInt(id) }, { assignedBranchId: BigInt(id) }],
            },
        });
        const vehicleCount = await database_1.default.vehicle.count({
            where: { branchId: BigInt(id) },
        });
        return userCount > 0 || vehicleCount > 0;
    }
}
exports.default = new BranchRepository();
//# sourceMappingURL=branch.repository.js.map