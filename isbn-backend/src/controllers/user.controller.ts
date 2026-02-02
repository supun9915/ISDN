import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { CreateUserDto, UpdateUserDto } from "../types";
import { serializeBigInt } from "../utils/serializer";

class UserController {
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      // Remove password from response
      const sanitizedUsers = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json({
        success: true,
        data: serializeBigInt(sanitizedUsers),
        message: "Users retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id as string);
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json({
        success: true,
        data: serializeBigInt(userWithoutPassword),
        message: "User retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const newUser = await userService.createUser(userData);
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json({
        success: true,
        data: serializeBigInt(userWithoutPassword),
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserDto = req.body;
      const updatedUser = await userService.updateUser(id as string, userData);
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json({
        success: true,
        data: serializeBigInt(userWithoutPassword),
        message: "User updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteUser(id as string);
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      await userService.changePassword(id as string, oldPassword, newPassword);
      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async activateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await userService.activateUser(id as string);
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json({
        success: true,
        data: userWithoutPassword,
        message: "User activated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
