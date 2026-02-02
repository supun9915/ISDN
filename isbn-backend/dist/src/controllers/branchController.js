"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const branchService_1 = __importDefault(require("../services/branchService"));
class BranchController {
    async getAllBranches(req, res, next) {
        try {
            const branches = await branchService_1.default.getAllBranches();
            res.json({
                success: true,
                data: branches,
                message: "Branches retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getBranchById(req, res, next) {
        try {
            const { id } = req.params;
            const branch = await branchService_1.default.getBranchById(id);
            res.json({
                success: true,
                data: branch,
                message: "Branch retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createBranch(req, res, next) {
        try {
            const branchData = req.body;
            // Validate required fields
            const requiredFields = ["name", "code"];
            const missingFields = requiredFields.filter((field) => !branchData[field]);
            if (missingFields.length > 0) {
                res.status(400).json({
                    success: false,
                    message: `Missing required fields: ${missingFields.join(", ")}`,
                });
                return;
            }
            const newBranch = await branchService_1.default.createBranch(branchData);
            res.status(201).json({
                success: true,
                data: newBranch,
                message: "Branch created successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateBranch(req, res, next) {
        try {
            const { id } = req.params;
            const branchData = req.body;
            const updatedBranch = await branchService_1.default.updateBranch(id, branchData);
            res.json({
                success: true,
                data: updatedBranch,
                message: "Branch updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBranch(req, res, next) {
        try {
            const { id } = req.params;
            await branchService_1.default.deleteBranch(id);
            res.json({
                success: true,
                message: "Branch deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async activateBranch(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBranch = await branchService_1.default.activateBranch(id);
            res.json({
                success: true,
                data: updatedBranch,
                message: "Branch activated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deactivateBranch(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBranch = await branchService_1.default.deactivateBranch(id);
            res.json({
                success: true,
                data: updatedBranch,
                message: "Branch deactivated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getBranchStats(req, res, next) {
        try {
            const { id } = req.params;
            const branchStats = await branchService_1.default.getBranchStats(id);
            res.json({
                success: true,
                data: branchStats,
                message: "Branch statistics retrieved successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new BranchController();
//# sourceMappingURL=branchController.js.map