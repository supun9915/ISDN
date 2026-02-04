"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = __importDefault(require("../controllers/roleController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All role routes require authentication and admin/manager role
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)(["admin", "manager"]));
// Get all roles
router.get("/", roleController_1.default.getAllRoles);
// Get role by ID
router.get("/:id", roleController_1.default.getRoleById);
// Create new role (admin only)
router.post("/", (0, auth_1.authorize)(["admin"]), roleController_1.default.createRole);
// Update role (admin only)
router.put("/:id", (0, auth_1.authorize)(["admin"]), roleController_1.default.updateRole);
// Delete role (admin only)
router.delete("/:id", (0, auth_1.authorize)(["admin"]), roleController_1.default.deleteRole);
// Activate role (admin only)
router.patch("/:id/activate", (0, auth_1.authorize)(["admin"]), roleController_1.default.activateRole);
// Deactivate role (admin only)
router.patch("/:id/deactivate", (0, auth_1.authorize)(["admin"]), roleController_1.default.deactivateRole);
exports.default = router;
//# sourceMappingURL=roleRoutes.js.map