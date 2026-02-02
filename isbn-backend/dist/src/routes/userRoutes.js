"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Change password (requires authentication)
router.patch("/:id/change-password", auth_1.authenticate, userController_1.default.changePassword);
// Get all users (requires authentication and admin role)
router.get("/", auth_1.authenticate, (0, auth_1.authorize)(["admin", "manager"]), userController_1.default.getAllUsers);
// Get user by ID (requires authentication)
router.get("/:id", auth_1.authenticate, userController_1.default.getUserById);
// Create new user (requires authentication and admin role)
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.createUser);
// Update user (requires authentication)
router.put("/:id", auth_1.authenticate, userController_1.default.updateUser);
// Delete user (requires authentication and admin role)
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.deleteUser);
// Activate user (requires authentication and admin role)
router.patch("/:id/activate", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.activateUser);
// Deactivate user (requires authentication and admin role)
router.patch("/:id/deactivate", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.deactivateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map