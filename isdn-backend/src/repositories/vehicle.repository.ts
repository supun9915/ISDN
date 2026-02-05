import prisma from "../../config/database";
import { Vehicle } from "../types";

class VehicleRepository {
  async findAll(): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany();
  }

  async findById(id: string | number): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: { id: BigInt(id) },
    });
  }

  async create(data: Omit<Vehicle, "id">): Promise<Vehicle> {
    return await prisma.vehicle.create({
      data: {
        vehicleNumber: data.vehicleNumber!,
        vehicleType: data.vehicleType!,
        brand: data.brand!,
        capacityKg: data.capacityKg!,
        branchId: data.branchId || null,
      },
    });
  }

  async update(
    id: string | number,
    data: Partial<Omit<Vehicle, "id">>,
  ): Promise<Vehicle> {
    return await prisma.vehicle.update({
      where: { id: BigInt(id) },
      data: {
        vehicleNumber: data.vehicleNumber,

        vehicleType: data.vehicleType,
        brand: data.brand,
        capacityKg: data.capacityKg,
      },
    });
  }

  async delete(id: string | number): Promise<Vehicle> {
    return await prisma.vehicle.delete({
      where: { id: BigInt(id) },
    });
  }

  async findByVehicleNumber(vehicleNumber: string): Promise<Vehicle | null> {
    return await prisma.vehicle.findUnique({
      where: { vehicleNumber },
    });
  }
}

export default new VehicleRepository();
