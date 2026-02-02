"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const branch_controller_1 = __importDefault(require("../controllers/branch.controller"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All branch routes require authentication
router.use(auth_1.authenticate);
// Get all branches (accessible to all authenticated users)
router.get("/", branch_controller_1.default.getAllBranches);
// Get branch by ID (accessible to all authenticated users)
router.get("/:id", branch_controller_1.default.getBranchById);
// Create new branch (admin and manager only)
router.post("/", (0, auth_1.authorize)(["admin", "manager"]), branch_controller_1.default.createBranch);
// Update branch (admin and manager only)
router.put("/:id", (0, auth_1.authorize)(["admin", "manager"]), branch_controller_1.default.updateBranch);
// Delete branch (admin only)
router.delete("/:id", (0, auth_1.authorize)(["admin"]), branch_controller_1.default.deleteBranch);
// Activate branch (admin and manager only)
router.patch("/:id/activate", (0, auth_1.authorize)(["admin", "manager"]), branch_controller_1.default.activateBranch);
exports.default = router;
//# sourceMappingURL=branch.routes.js.map