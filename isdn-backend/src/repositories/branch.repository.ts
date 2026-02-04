import prisma from "../../config/database";
import { Branch, CreateBranchDto, UpdateBranchDto } from "../types";

class BranchRepository {
  async findAll(): Promise<Branch[]> {
    return await prisma.branch.findMany({
      include: {
        _count: {
          select: {
            users: true,
            assignedCustomers: true,
            vehicles: true,
            inventories: true,
          },
        },
      },
    });
  }

  async findById(id: string | number): Promise<Branch | null> {
    return await prisma.branch.findUnique({
      where: { id: BigInt(id) },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            contactNumber: true,
            active: true,
          },
        },
        assignedCustomers: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            businessName: true,
            customerCode: true,
            active: true,
          },
        },
        vehicles: {
          select: {
            id: true,
            vehicleNumber: true,
            vehicleType: true,
            brand: true,
            capacityKg: true,
          },
        },
      },
    });
  }

  async findByCode(code: string): Promise<Branch | null> {
    return await prisma.branch.findUnique({
      where: { code },
    });
  }

  async create(branchData: CreateBranchDto): Promise<Branch> {
    return await prisma.branch.create({
      data: branchData,
    });
  }

  async update(
    id: string | number,
    branchData: UpdateBranchDto,
  ): Promise<Branch> {
    return await prisma.branch.update({
      where: { id: BigInt(id) },
      data: branchData,
    });
  }

  async delete(id: string | number): Promise<Branch> {
    return await prisma.branch.delete({
      where: { id: BigInt(id) },
    });
  }

  async checkBranchInUse(id: string | number): Promise<boolean> {
    const userCount = await prisma.user.count({
      where: {
        OR: [{ branchId: BigInt(id) }, { assignedBranchId: BigInt(id) }],
      },
    });

    const vehicleCount = await prisma.vehicle.count({
      where: { branchId: BigInt(id) },
    });

    return userCount > 0 || vehicleCount > 0;
  }
}

export default new BranchRepository();
