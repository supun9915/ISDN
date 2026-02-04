import { Request, Response, NextFunction } from "express";
import branchService from "../services/branch.service";
import { CreateBranchDto, UpdateBranchDto } from "../types";
import { serializeBigInt } from "../utils/serializer";

class BranchController {
  async getAllBranches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const branches = await branchService.getAllBranches();
      res.json({
        success: true,
        data: serializeBigInt(branches),
        message: "Branches retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getBranchById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const branch = await branchService.getBranchById(id as string);
      res.json({
        success: true,
        data: serializeBigInt(branch),
        message: "Branch retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createBranch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const branchData: CreateBranchDto = req.body;

      // Validate required fields
      const requiredFields = ["name", "code"];
      const missingFields = requiredFields.filter(
        (field) => !branchData[field as keyof CreateBranchDto],
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
        return;
      }

      const newBranch = await branchService.createBranch(branchData);
      res.status(201).json({
        success: true,
        data: serializeBigInt(newBranch),
        message: "Branch created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBranch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const branchData: UpdateBranchDto = req.body;
      const updatedBranch = await branchService.updateBranch(
        id as string,
        branchData,
      );
      res.json({
        success: true,
        data: serializeBigInt(updatedBranch),
        message: "Branch updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBranch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await branchService.deleteBranch(id as string);
      res.json({
        success: true,
        message: "Branch deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async activateBranch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updatedBranch = await branchService.activateBranch(id as string);
      res.json({
        success: true,
        data: serializeBigInt(updatedBranch),
        message: "Branch activated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BranchController();
