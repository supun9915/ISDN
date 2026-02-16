class Product {
  final String id;
  final String productCode;
  final String name;
  final String? description;
  final double unitPrice;
  final String? unitType;
  final String? categoryId;
  final String? categoryName;
  final String? imageUrl;
  final int? quantity;
  final bool active;
  final Promotion? promotion;

  Product({
    required this.id,
    required this.productCode,
    required this.name,
    this.description,
    required this.unitPrice,
    this.unitType,
    this.categoryId,
    this.categoryName,
    this.imageUrl,
    this.quantity,
    this.active = true,
    this.promotion,
  });

  // Helper getter for backwards compatibility
  double get price => unitPrice;
  String? get category => categoryName;
  int? get stock => quantity;

  factory Product.fromJson(Map<String, dynamic> json) {
    // Extract category name from nested category object
    String? categoryId;
    String? categoryName;
    if (json['category'] != null && json['category'] is Map) {
      categoryId = json['category']['id']?.toString();
      categoryName = json['category']['name'];
    } else if (json['categoryId'] != null) {
      categoryId = json['categoryId']?.toString();
      categoryName = json['categoryName'];
    }

    // Extract quantity from inventories array (first inventory)
    int? quantity;
    if (json['inventories'] != null &&
        json['inventories'] is List &&
        (json['inventories'] as List).isNotEmpty) {
      quantity = json['inventories'][0]['quantity'];
    }

    // Parse promotion
    Promotion? promotion;
    if (json['promotion'] != null && json['promotion'] is Map) {
      promotion = Promotion.fromJson(json['promotion']);
    }

    return Product(
      id: json['id']?.toString() ?? '',
      productCode: json['productCode'] ?? '',
      name: json['name'] ?? '',
      description: json['description'],
      unitPrice: (json['unitPrice'] ?? 0).toDouble(),
      unitType: json['unitType'],
      categoryId: categoryId,
      categoryName: categoryName,
      imageUrl: json['imageUrl'],
      quantity: quantity,
      active: json['active'] ?? true,
      promotion: promotion,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'productCode': productCode,
      'name': name,
      'description': description,
      'unitPrice': unitPrice,
      'unitType': unitType,
      'categoryId': categoryId,
      'categoryName': categoryName,
      'imageUrl': imageUrl,
      'quantity': quantity,
      'active': active,
    };
  }
}

class Promotion {
  final String id;
  final String title;
  final double discountPercent;
  final DateTime? startDate;
  final DateTime? endDate;
  final bool active;

  Promotion({
    required this.id,
    required this.title,
    required this.discountPercent,
    this.startDate,
    this.endDate,
    this.active = true,
  });

  factory Promotion.fromJson(Map<String, dynamic> json) {
    return Promotion(
      id: json['id']?.toString() ?? '',
      title: json['title'] ?? '',
      discountPercent: (json['discountPercent'] ?? 0).toDouble(),
      startDate: json['startDate'] != null
          ? DateTime.parse(json['startDate'])
          : null,
      endDate: json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
      active: json['active'] ?? true,
    );
  }
}
