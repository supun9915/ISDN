import prisma from "../../config/database";
import { Product, CreateProductDto, UpdateProductDto } from "../types";

class ProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        promotion: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            inventories: true,
            orderItems: true,
          },
        },
      },
    });
  }

  async findById(id: string | number): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id: BigInt(id) },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        promotion: true,
        inventories: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });
  }

  async findByProductCode(productCode: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { productCode },
    });
  }

  async findByCategory(categoryId: string | number): Promise<Product[]> {
    return await prisma.product.findMany({
      where: { categoryId: BigInt(categoryId) },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(productData: CreateProductDto): Promise<Product> {
    return await prisma.product.create({
      data: {
        ...productData,
        categoryId: BigInt(productData.categoryId),
        promotionId: productData.promotionId
          ? BigInt(productData.promotionId)
          : null,
      },
    });
  }

  async update(
    id: string | number,
    productData: UpdateProductDto,
  ): Promise<Product> {
    const updateData: any = { ...productData };

    // Convert BigInt fields
    if (productData.categoryId) {
      updateData.categoryId = BigInt(productData.categoryId);
    }
    if (productData.promotionId !== undefined) {
      updateData.promotionId = productData.promotionId
        ? BigInt(productData.promotionId)
        : null;
    }

    return await prisma.product.update({
      where: { id: BigInt(id) },
      data: updateData,
    });
  }

  async delete(id: string | number): Promise<Product> {
    return await prisma.product.delete({
      where: { id: BigInt(id) },
    });
  }

  async checkProductInUse(id: string | number): Promise<boolean> {
    const inventoryCount = await prisma.inventory.count({
      where: { productId: BigInt(id) },
    });

    const orderItemCount = await prisma.orderItem.count({
      where: { productId: BigInt(id) },
    });

    return inventoryCount > 0 || orderItemCount > 0;
  }
}

export default new ProductRepository();
