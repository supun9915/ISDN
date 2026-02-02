import { Request, Response, NextFunction } from "express";
declare class RoleController {
    getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRoleById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    activateRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    deactivateRole(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: RoleController;
export default _default;
