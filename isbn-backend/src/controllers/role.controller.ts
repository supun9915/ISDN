import { Request, Response, NextFunction } from "express";
import roleService from "../services/role.service";
import { CreateRoleDto, UpdateRoleDto } from "../types";
import { serializeBigInt } from "../utils/serializer";

class RoleController {
  async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const roles = await roleService.getAllRoles();
      res.json({
        success: true,
        data: serializeBigInt(roles),
        message: "Roles retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id as string);
      res.json({
        success: true,
        data: serializeBigInt(role),
        message: "Role retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoleController();
