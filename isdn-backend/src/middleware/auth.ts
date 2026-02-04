import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database";
import { User, JwtPayload } from "../types";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: BigInt(payload.id) },
        include: {
          role: true,
          branch: true,
          assignedBranch: true,
          vehicle: true,
        },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

interface AuthenticatedRequest extends Request {
  user?: User;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Unauthorized",
        });
      }

      // Check if token is blacklisted
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      if (token) {
        try {
          const blacklistedToken = await prisma.blacklistedToken.findUnique({
            where: { token },
          });
          if (blacklistedToken) {
            return res.status(401).json({
              success: false,
              message: "Token has been revoked",
            });
          }
        } catch (error) {
          return next(error);
        }
      }

      req.user = user;
      next();
    },
  )(req, res, next);
};

const authorize = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const userRole = (req.user as any)?.role?.roleName?.toLowerCase();
    const allowedRoles = roles.map((role) => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient permissions",
      });
      return;
    }
    next();
  };
};

export { authenticate, authorize };
