"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const branchController_1 = __importDefault(require("../controllers/branchController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All branch routes require authentication
router.use(auth_1.authenticate);
// Get all branches (accessible to all authenticated users)
router.get("/", branchController_1.default.getAllBranches);
// Get branch by ID (accessible to all authenticated users)
router.get("/:id", branchController_1.default.getBranchById);
// Get branch statistics (accessible to all authenticated users)
router.get("/:id/stats", branchController_1.default.getBranchStats);
// Create new branch (admin and manager only)
router.post("/", (0, auth_1.authorize)(["admin", "manager"]), branchController_1.default.createBranch);
// Update branch (admin and manager only)
router.put("/:id", (0, auth_1.authorize)(["admin", "manager"]), branchController_1.default.updateBranch);
// Delete branch (admin only)
router.delete("/:id", (0, auth_1.authorize)(["admin"]), branchController_1.default.deleteBranch);
// Activate branch (admin and manager only)
router.patch("/:id/activate", (0, auth_1.authorize)(["admin", "manager"]), branchController_1.default.activateBranch);
// Deactivate branch (admin and manager only)
router.patch("/:id/deactivate", (0, auth_1.authorize)(["admin", "manager"]), branchController_1.default.deactivateBranch);
exports.default = router;
//# sourceMappingURL=branchRoutes.js.map