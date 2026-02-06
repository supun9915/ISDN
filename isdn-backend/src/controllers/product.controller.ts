import { Request, Response, NextFunction } from "express";
import productService from "../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../types";
import { serializeBigInt } from "../utils/serializer";

class ProductController {
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.json({
        success: true,
        data: serializeBigInt(products),
        message: "Products retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id as string);
      res.json({
        success: true,
        data: serializeBigInt(product),
        message: "Product retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { categoryId } = req.params;
      const products = await productService.getProductsByCategory(
        categoryId as string,
      );
      res.json({
        success: true,
        data: serializeBigInt(products),
        message: "Products retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const productData: CreateProductDto = req.body;

      // Validate required fields
      const requiredFields = [
        "productCode",
        "name",
        "categoryId",
        "unitPrice",
        "unitType",
      ];
      const missingFields = requiredFields.filter(
        (field) => !productData[field as keyof CreateProductDto],
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
        return;
      }

      const newProduct = await productService.createProduct(productData);
      res.status(201).json({
        success: true,
        data: serializeBigInt(newProduct),
        message: "Product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const productData: UpdateProductDto = req.body;
      const updatedProduct = await productService.updateProduct(
        id as string,
        productData,
      );
      res.json({
        success: true,
        data: serializeBigInt(updatedProduct),
        message: "Product updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id as string);
      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async activateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updatedProduct = await productService.activateProduct(id as string);
      res.json({
        success: true,
        data: serializeBigInt(updatedProduct),
        message: "Product activated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updatedProduct = await productService.deactivateProduct(
        id as string,
      );
      res.json({
        success: true,
        data: serializeBigInt(updatedProduct),
        message: "Product deactivated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
