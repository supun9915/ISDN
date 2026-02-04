import prisma from "../../config/database";
import { Role, CreateRoleDto, UpdateRoleDto } from "../types";

class RoleRepository {
  async findAll(): Promise<Role[]> {
    return await prisma.role.findMany({
      include: {
        _count: {
          select: { users: true },
        },
      },
    });
  }

  async findById(id: string | number): Promise<Role | null> {
    return await prisma.role.findUnique({
      where: { id: BigInt(id) },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            active: true,
          },
        },
      },
    });
  }

  async findByName(roleName: string): Promise<Role | null> {
    return await prisma.role.findFirst({
      where: { roleName },
    });
  }

  async create(roleData: CreateRoleDto): Promise<Role> {
    return await prisma.role.create({
      data: {
        roleName: roleData.roleName,
        permissions: roleData.permissions || "{}",
      },
    });
  }

  async update(id: string | number, roleData: UpdateRoleDto): Promise<Role> {
    return await prisma.role.update({
      where: { id: BigInt(id) },
      data: roleData,
    });
  }

  async delete(id: string | number): Promise<Role> {
    return await prisma.role.delete({
      where: { id: BigInt(id) },
    });
  }

  async checkRoleInUse(id: string | number): Promise<boolean> {
    const count = await prisma.user.count({
      where: { roleId: BigInt(id) },
    });
    return count > 0;
  }
}

export default new RoleRepository();
