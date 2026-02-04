"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const branchRepository_1 = __importDefault(require("../repositories/branchRepository"));
class BranchService {
    async getAllBranches() {
        return await branchRepository_1.default.findAll();
    }
    async getBranchById(id) {
        const branch = await branchRepository_1.default.findById(id);
        if (!branch) {
            throw new Error("Branch not found");
        }
        return branch;
    }
    async createBranch(branchData) {
        // Check if branch with the same code already exists
        const existingBranch = await branchRepository_1.default.findByCode(branchData.code);
        if (existingBranch) {
            throw new Error("Branch with this code already exists");
        }
        return await branchRepository_1.default.create(branchData);
    }
    async updateBranch(id, branchData) {
        await this.getBranchById(id);
        // If code is being updated, check if it's already in use by another branch
        if (branchData.code) {
            const existingBranch = await branchRepository_1.default.findByCode(branchData.code);
            if (existingBranch && existingBranch.id !== BigInt(id)) {
                throw new Error("Branch code is already in use by another branch");
            }
        }
        return await branchRepository_1.default.update(id, branchData);
    }
    async deleteBranch(id) {
        await this.getBranchById(id);
        // Check if branch is being used by any users or vehicles
        const isInUse = await branchRepository_1.default.checkBranchInUse(id);
        if (isInUse) {
            throw new Error("Cannot delete branch that has assigned users or vehicles. Please reassign them first.");
        }
        return await branchRepository_1.default.delete(id);
    }
    async activateBranch(id) {
        await this.getBranchById(id);
        return await branchRepository_1.default.update(id, { active: true });
    }
    async deactivateBranch(id) {
        await this.getBranchById(id);
        return await branchRepository_1.default.update(id, { active: false });
    }
    async getBranchStats(id) {
        const branchStats = await branchRepository_1.default.getBranchStats(id);
        if (!branchStats) {
            throw new Error("Branch not found");
        }
        return branchStats;
    }
}
exports.default = new BranchService();
//# sourceMappingURL=branchService.js.map