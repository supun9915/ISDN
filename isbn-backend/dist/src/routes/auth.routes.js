"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// POST /api/auth/login
router.post("/login", auth_controller_1.default.login);
// POST /api/auth/register
router.post("/register", auth_controller_1.default.register);
// GET /api/auth/me (requires authentication)
router.get("/me", auth_1.authenticate, auth_controller_1.default.getCurrentUser);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map