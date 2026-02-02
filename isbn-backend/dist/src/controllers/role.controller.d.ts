import { Request, Response, NextFunction } from "express";
declare class RoleController {
    getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRoleById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: RoleController;
export default _default;
