import { Request, Response, NextFunction } from "express";
declare class UserController {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    changePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    activateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deactivateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
