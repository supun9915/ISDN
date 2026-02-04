import { Request, Response, NextFunction } from "express";
declare class BranchController {
    getAllBranches(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBranchById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    activateBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    deactivateBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBranchStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: BranchController;
export default _default;
