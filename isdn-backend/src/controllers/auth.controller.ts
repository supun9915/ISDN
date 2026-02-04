import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../services/user.service";
import { CreateUserDto, LoginDto, JwtPayload } from "../types";
import { serializeBigInt } from "../utils/serializer";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password }: LoginDto & { username?: string } =
        req.body;

      if ((!email && !username) || !password) {
        res.status(400).json({
          success: false,
          message: "Email/username and password are required",
        });
        return;
      }

      let user;
      if (email) {
        user = await userService.getUserByEmail(email);
      } else {
        user = await userService.getUserByUsername(username!);
      }

      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
        return;
      }

      if (!user.active) {
        res.status(401).json({
          success: false,
          message: "Account is deactivated",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
        return;
      }

      const tokenPayload: JwtPayload = {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        roleId: user.roleId.toString(),
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      } as any);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: serializeBigInt({
          token,
          user: userWithoutPassword,
        }),
        message: "Login successful",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
        return;
      }
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;

      // Validate required fields
      const requiredFields = [
        "username",
        "email",
        "password",
        "name",
        "contactNumber",
        "roleId",
      ];
      const missingFields = requiredFields.filter(
        (field) => !userData[field as keyof CreateUserDto],
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
        return;
      }

      const newUser = await userService.createUser(userData);

      const tokenPayload: JwtPayload = {
        id: newUser.id.toString(),
        email: newUser.email,
        username: newUser.username,
        roleId: newUser.roleId.toString(),
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      } as any);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        data: serializeBigInt({
          token,
          user: userWithoutPassword,
        }),
        message: "Registration successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const user = await userService.getUserById(userId);
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: serializeBigInt(userWithoutPassword),
        message: "Current user retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
