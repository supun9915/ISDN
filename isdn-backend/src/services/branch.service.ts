import branchRepository from "../repositories/branch.repository";
import { Branch, CreateBranchDto, UpdateBranchDto } from "../types";

class BranchService {
  async getAllBranches(): Promise<Branch[]> {
    return await branchRepository.findAll();
  }

  async getBranchById(id: string | number): Promise<Branch> {
    const branch = await branchRepository.findById(id);
    if (!branch) {
      throw new Error("Branch not found");
    }
    return branch;
  }

  async createBranch(branchData: CreateBranchDto): Promise<Branch> {
    // Check if branch with the same code already exists
    const existingBranch = await branchRepository.findByCode(branchData.code);
    if (existingBranch) {
      throw new Error("Branch with this code already exists");
    }

    return await branchRepository.create(branchData);
  }

  async updateBranch(
    id: string | number,
    branchData: UpdateBranchDto,
  ): Promise<Branch> {
    await this.getBranchById(id);

    // If code is being updated, check if it's already in use by another branch
    if (branchData.code) {
      const existingBranch = await branchRepository.findByCode(branchData.code);
      if (existingBranch && existingBranch.id !== BigInt(id)) {
        throw new Error("Branch code is already in use by another branch");
      }
    }

    return await branchRepository.update(id, branchData);
  }

  async deleteBranch(id: string | number): Promise<Branch> {
    await this.getBranchById(id);

    // Check if branch is being used by any users or vehicles
    const isInUse = await branchRepository.checkBranchInUse(id);
    if (isInUse) {
      throw new Error(
        "Cannot delete branch that has assigned users or vehicles. Please reassign them first.",
      );
    }

    return await branchRepository.delete(id);
  }

  async activateBranch(id: string | number): Promise<Branch> {
    await this.getBranchById(id);
    return await branchRepository.update(id, { active: true });
  }
}

export default new BranchService();
