import 'package:flutter/foundation.dart';
import '../models/product_model.dart';
import '../models/product_category_model.dart';
import '../services/api_service.dart';

class ProductProvider with ChangeNotifier {
  final ApiService _apiService;
  List<Product> _products = [];
  List<Product> _filteredProducts = [];
  List<ProductCategory> _categories = [];
  bool _isLoading = false;
  String? _errorMessage;
  String? _selectedCategoryId;
  String? _sortBy;

  ProductProvider(this._apiService);

  List<Product> get products => _filteredProducts;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String? get selectedCategoryId => _selectedCategoryId;
  String? get sortBy => _sortBy;
  List<ProductCategory> get categories => _categories;

  Future<void> loadProducts() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      // Load categories first if not loaded
      if (_categories.isEmpty) {
        await loadCategories();
      }

      final response = await _apiService.getProducts();
      _products = response.map((json) => Product.fromJson(json)).toList();
      _applyFilters();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadCategories() async {
    try {
      final response = await _apiService.getProductCategories();
      _categories = response
          .map((json) => ProductCategory.fromJson(json))
          .toList();
    } catch (e) {
      // Categories load failed, continue without them
      _categories = [];
    }
  }

  void filterByCategoryId(String? categoryId) {
    _selectedCategoryId = categoryId;
    _applyFilters();
    notifyListeners();
  }

  void setSortBy(String? sortOption) {
    _sortBy = sortOption;
    _applyFilters();
    notifyListeners();
  }

  void _applyFilters() {
    _filteredProducts = List.from(_products);

    // Apply category filter
    if (_selectedCategoryId != null && _selectedCategoryId!.isNotEmpty) {
      _filteredProducts = _filteredProducts
          .where((p) => p.categoryId == _selectedCategoryId)
          .toList();
    }

    // Apply sorting
    if (_sortBy == 'price_low') {
      _filteredProducts.sort((a, b) => a.price.compareTo(b.price));
    } else if (_sortBy == 'price_high') {
      _filteredProducts.sort((a, b) => b.price.compareTo(a.price));
    } else if (_sortBy == 'name') {
      _filteredProducts.sort((a, b) => a.name.compareTo(b.name));
    }
  }

  void clearFilters() {
    _selectedCategoryId = null;
    _sortBy = null;
    _applyFilters();
    notifyListeners();
  }
}
