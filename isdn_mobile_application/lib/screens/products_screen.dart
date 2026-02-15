import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../providers/product_provider.dart';
import '../providers/cart_provider.dart';
import '../models/product_model.dart';
import '../services/api_service.dart';
import '../config/theme.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ProductProvider>(context, listen: false).loadProducts();
    });
  }

  void _showFilterDialog() {
    final productProvider = Provider.of<ProductProvider>(
      context,
      listen: false,
    );

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Filter & Sort'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Category',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: [
                FilterChip(
                  label: const Text('All'),
                  selected: productProvider.selectedCategoryId == null,
                  onSelected: (selected) {
                    productProvider.filterByCategoryId(null);
                    Navigator.pop(context);
                  },
                ),
                ...productProvider.categories.map((category) {
                  return FilterChip(
                    label: Text(category.name),
                    selected: productProvider.selectedCategoryId == category.id,
                    onSelected: (selected) {
                      productProvider.filterByCategoryId(
                        selected ? category.id : null,
                      );
                      Navigator.pop(context);
                    },
                  );
                }),
              ],
            ),
            const SizedBox(height: 16),
            const Text(
              'Sort By',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            ListTile(
              title: const Text('Price: Low to High'),
              leading: Radio<String>(
                value: 'price_low',
                groupValue: productProvider.sortBy,
                onChanged: (value) {
                  productProvider.setSortBy(value);
                  Navigator.pop(context);
                },
              ),
              contentPadding: EdgeInsets.zero,
              dense: true,
            ),
            ListTile(
              title: const Text('Price: High to Low'),
              leading: Radio<String>(
                value: 'price_high',
                groupValue: productProvider.sortBy,
                onChanged: (value) {
                  productProvider.setSortBy(value);
                  Navigator.pop(context);
                },
              ),
              contentPadding: EdgeInsets.zero,
              dense: true,
            ),
            ListTile(
              title: const Text('Name'),
              leading: Radio<String>(
                value: 'name',
                groupValue: productProvider.sortBy,
                onChanged: (value) {
                  productProvider.setSortBy(value);
                  Navigator.pop(context);
                },
              ),
              contentPadding: EdgeInsets.zero,
              dense: true,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              productProvider.clearFilters();
              Navigator.pop(context);
            },
            child: const Text('Clear Filters'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Products'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: Consumer<ProductProvider>(
        builder: (context, productProvider, child) {
          if (productProvider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (productProvider.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.error_outline,
                    size: 64,
                    color: AppTheme.error,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    productProvider.errorMessage!,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: AppTheme.error),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => productProvider.loadProducts(),
                    child: const Text('Retry'),
                  ),
                ],
              ),
            );
          }

          if (productProvider.products.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.shopping_bag_outlined,
                    size: 64,
                    color: AppTheme.grey,
                  ),
                  SizedBox(height: 16),
                  Text(
                    'No products available',
                    style: TextStyle(color: AppTheme.grey),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => productProvider.loadProducts(),
            child: GridView.builder(
              padding: const EdgeInsets.all(8),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.7,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: productProvider.products.length,
              itemBuilder: (context, index) {
                final product = productProvider.products[index];
                return ProductCard(product: product);
              },
            ),
          );
        },
      ),
    );
  }
}

class ProductCard extends StatelessWidget {
  final Product product;

  const ProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product Image
          Expanded(
            flex: 3,
            child: Container(
              width: double.infinity,
              color: AppTheme.lightGrey,
              child: product.imageUrl != null
                  ? CachedNetworkImage(
                      imageUrl: '${ApiService.imageBaseUrl}${product.imageUrl}',
                      fit: BoxFit.cover,
                      placeholder: (context, url) =>
                          const Center(child: CircularProgressIndicator()),
                      errorWidget: (context, url, error) => const Icon(
                        Icons.image_not_supported,
                        size: 50,
                        color: AppTheme.grey,
                      ),
                    )
                  : const Icon(
                      Icons.shopping_bag,
                      size: 50,
                      color: AppTheme.grey,
                    ),
            ),
          ),

          // Product Details
          Expanded(
            flex: 2,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Product Name
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),

                  // Category
                  if (product.category != null)
                    Text(
                      product.category!,
                      style: TextStyle(fontSize: 12, color: AppTheme.grey),
                    ),
                  const Spacer(),

                  // Price and Add Button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$${product.price.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          color: AppTheme.primaryTeal,
                        ),
                      ),
                      Consumer<CartProvider>(
                        builder: (context, cartProvider, child) {
                          return IconButton(
                            icon: const Icon(Icons.add_shopping_cart),
                            color: AppTheme.primaryTeal,
                            iconSize: 20,
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                            onPressed: () {
                              cartProvider.addItem(product);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    '${product.name} added to cart',
                                  ),
                                  duration: const Duration(seconds: 1),
                                  backgroundColor: AppTheme.success,
                                ),
                              );
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
