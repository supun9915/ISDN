import productRepository from "../repositories/product.repository";
import productCategoryRepository from "../repositories/productCategory.repository";
import { Product, CreateProductDto, UpdateProductDto } from "../types";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return await productRepository.findAll();
  }

  async getProductById(id: string | number): Promise<Product> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async getProductsByCategory(categoryId: string | number): Promise<Product[]> {
    // Verify category exists
    const category = await productCategoryRepository.findById(categoryId);
    if (!category) {
      throw new Error("Product category not found");
    }

    return await productRepository.findByCategory(categoryId);
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    // Check if product with the same code already exists
    const existingProduct = await productRepository.findByProductCode(
      productData.productCode,
    );
    if (existingProduct) {
      throw new Error("Product with this code already exists");
    }

    // Verify category exists
    const category = await productCategoryRepository.findById(
      Number(productData.categoryId),
    );
    if (!category) {
      throw new Error("Product category not found");
    }

    return await productRepository.create(productData);
  }

  async updateProduct(
    id: string | number,
    productData: UpdateProductDto,
  ): Promise<Product> {
    await this.getProductById(id);

    // If product code is being updated, check if it's already in use by another product
    if (productData.productCode) {
      const existingProduct = await productRepository.findByProductCode(
        productData.productCode,
      );
      if (existingProduct && existingProduct.id !== BigInt(id)) {
        throw new Error("Product code is already in use by another product");
      }
    }

    // If category is being updated, verify it exists
    if (productData.categoryId) {
      const category = await productCategoryRepository.findById(
        Number(productData.categoryId),
      );
      if (!category) {
        throw new Error("Product category not found");
      }
    }

    return await productRepository.update(id, productData);
  }

  async deleteProduct(id: string | number): Promise<Product> {
    await this.getProductById(id);

    // Check if product is being used in inventory or orders
    const isInUse = await productRepository.checkProductInUse(id);
    if (isInUse) {
      throw new Error(
        "Cannot delete product that has inventory or order records. Consider deactivating it instead.",
      );
    }

    return await productRepository.delete(id);
  }

  async activateProduct(id: string | number): Promise<Product> {
    await this.getProductById(id);
    return await productRepository.update(id, { active: true });
  }

  async deactivateProduct(id: string | number): Promise<Product> {
    await this.getProductById(id);
    return await productRepository.update(id, { active: false });
  }
}

export default new ProductService();
