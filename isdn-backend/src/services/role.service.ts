import roleRepository from "../repositories/role.repository";
import { Role, CreateRoleDto, UpdateRoleDto } from "../types";

class RoleService {
  async getAllRoles(): Promise<Role[]> {
    return await roleRepository.findAll();
  }

  async getRoleById(id: string | number): Promise<Role> {
    const role = await roleRepository.findById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async createRole(roleData: CreateRoleDto): Promise<Role> {
    // Check if role with the same name already exists
    const existingRole = await roleRepository.findByName(roleData.roleName);
    if (existingRole) {
      throw new Error("Role with this name already exists");
    }

    return await roleRepository.create(roleData);
  }

  async updateRole(
    id: string | number,
    roleData: UpdateRoleDto,
  ): Promise<Role> {
    await this.getRoleById(id);

    // If roleName is being updated, check if it's already in use by another role
    if (roleData.roleName) {
      const existingRole = await roleRepository.findByName(roleData.roleName);
      if (existingRole && existingRole.id !== BigInt(id)) {
        throw new Error("Role name is already in use by another role");
      }
    }

    return await roleRepository.update(id, roleData);
  }

  async deleteRole(id: string | number): Promise<Role> {
    await this.getRoleById(id);

    // Check if role is being used by any users
    const isInUse = await roleRepository.checkRoleInUse(id);
    if (isInUse) {
      throw new Error(
        "Cannot delete role that is assigned to users. Please reassign users first.",
      );
    }

    return await roleRepository.delete(id);
  }

  async activateRole(id: string | number): Promise<Role> {
    await this.getRoleById(id);
    return await roleRepository.update(id, { active: true });
  }

  async deactivateRole(id: string | number): Promise<Role> {
    await this.getRoleById(id);
    return await roleRepository.update(id, { active: false });
  }
}

export default new RoleService();
