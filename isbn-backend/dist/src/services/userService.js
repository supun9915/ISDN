"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    async getAllUsers() {
        return await userRepository_1.default.findAll();
    }
    async getUserById(id) {
        const user = await userRepository_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    async getUserByEmail(email) {
        const user = await userRepository_1.default.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    async getUserByUsername(username) {
        const user = await userRepository_1.default.findByUsername(username);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    async createUser(userData) {
        // Check if user with email already exists
        const existingUserByEmail = await userRepository_1.default.findByEmail(userData.email);
        if (existingUserByEmail) {
            throw new Error("User with this email already exists");
        }
        // Check if user with username already exists
        const existingUserByUsername = await userRepository_1.default.findByUsername(userData.username);
        if (existingUserByUsername) {
            throw new Error("User with this username already exists");
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 12);
        const newUserData = {
            ...userData,
            password: hashedPassword,
        };
        return await userRepository_1.default.create(newUserData);
    }
    async updateUser(id, userData) {
        await this.getUserById(id);
        // If email is being updated, check if it's already in use by another user
        if (userData.email) {
            const existingUser = await userRepository_1.default.findByEmail(userData.email);
            if (existingUser && existingUser.id !== BigInt(id)) {
                throw new Error("Email is already in use by another user");
            }
        }
        // If username is being updated, check if it's already in use by another user
        if (userData.username) {
            const existingUser = await userRepository_1.default.findByUsername(userData.username);
            if (existingUser && existingUser.id !== BigInt(id)) {
                throw new Error("Username is already in use by another user");
            }
        }
        // Remove password from update data if present (use separate method for password updates)
        const { password, ...updateData } = userData;
        return await userRepository_1.default.update(id, updateData);
    }
    async deleteUser(id) {
        await this.getUserById(id);
        return await userRepository_1.default.delete(id);
    }
    async changePassword(id, oldPassword, newPassword) {
        const user = await this.getUserById(id);
        // Verify old password
        const isValidPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid current password");
        }
        // Hash new password
        const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 12);
        return await userRepository_1.default.updatePassword(id, hashedNewPassword);
    }
    async activateUser(id) {
        await this.getUserById(id);
        return await userRepository_1.default.update(id, { active: true });
    }
    async deactivateUser(id) {
        await this.getUserById(id);
        return await userRepository_1.default.update(id, { active: false });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map