import { Branch, CreateBranchDto, UpdateBranchDto } from "../types";
declare class BranchRepository {
    findAll(): Promise<Branch[]>;
    findById(id: string | number): Promise<Branch | null>;
    findByCode(code: string): Promise<Branch | null>;
    create(branchData: CreateBranchDto): Promise<Branch>;
    update(id: string | number, branchData: UpdateBranchDto): Promise<Branch>;
    delete(id: string | number): Promise<Branch>;
    checkBranchInUse(id: string | number): Promise<boolean>;
    getBranchStats(id: string | number): Promise<any>;
}
declare const _default: BranchRepository;
export default _default;
