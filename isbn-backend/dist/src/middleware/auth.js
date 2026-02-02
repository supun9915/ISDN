"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const database_1 = __importDefault(require("../../config/database"));
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await database_1.default.user.findUnique({
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
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
}));
const authenticate = passport_1.default.authenticate("jwt", { session: false });
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const userRole = req.user?.role?.roleName?.toLowerCase();
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
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map