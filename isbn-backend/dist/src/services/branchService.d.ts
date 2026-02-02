import { Branch, CreateBranchDto, UpdateBranchDto } from "../types";
declare class BranchService {
    getAllBranches(): Promise<Branch[]>;
    getBranchById(id: string | number): Promise<Branch>;
    createBranch(branchData: CreateBranchDto): Promise<Branch>;
    updateBranch(id: string | number, branchData: UpdateBranchDto): Promise<Branch>;
    deleteBranch(id: string | number): Promise<Branch>;
    activateBranch(id: string | number): Promise<Branch>;
    deactivateBranch(id: string | number): Promise<Branch>;
    getBranchStats(id: string | number): Promise<any>;
}
declare const _default: BranchService;
export default _default;
