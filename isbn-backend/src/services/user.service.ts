import userRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { User, CreateUserDto, UpdateUserDto } from "../types";

class UserService {
  async getAllUsers(): Promise<User[]> {
    return await userRepository.findAll();
  }

  async getUserById(id: string | number): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUserByEmail = await userRepository.findByEmail(
      userData.email,
    );
    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }

    // Check if user with username already exists
    const existingUserByUsername = await userRepository.findByUsername(
      userData.username,
    );
    if (existingUserByUsername) {
      throw new Error("User with this username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUserData = {
      ...userData,
      password: hashedPassword,
    };

    return await userRepository.create(newUserData);
  }

  async updateUser(
    id: string | number,
    userData: UpdateUserDto,
  ): Promise<User> {
    await this.getUserById(id);

    // If email is being updated, check if it's already in use by another user
    if (userData.email) {
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== BigInt(id)) {
        throw new Error("Email is already in use by another user");
      }
    }

    // If username is being updated, check if it's already in use by another user
    if (userData.username) {
      const existingUser = await userRepository.findByUsername(
        userData.username,
      );
      if (existingUser && existingUser.id !== BigInt(id)) {
        throw new Error("Username is already in use by another user");
      }
    }

    // Remove password from update data if present (use separate method for password updates)
    const { password, ...updateData } = userData;

    return await userRepository.update(id, updateData);
  }

  async deleteUser(id: string | number): Promise<User> {
    await this.getUserById(id);
    return await userRepository.delete(id);
  }

  async changePassword(
    id: string | number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.getUserById(id);

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid current password");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    return await userRepository.updatePassword(id, hashedNewPassword);
  }

  async activateUser(id: string | number): Promise<User> {
    await this.getUserById(id);
    return await userRepository.update(id, { active: true });
  }

  async deactivateUser(id: string | number): Promise<User> {
    await this.getUserById(id);
    return await userRepository.update(id, { active: false });
  }
}

export default new UserService();
