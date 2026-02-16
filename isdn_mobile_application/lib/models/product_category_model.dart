class ProductCategory {
  final String id;
  final String name;
  final bool active;

  ProductCategory({required this.id, required this.name, this.active = true});

  factory ProductCategory.fromJson(Map<String, dynamic> json) {
    return ProductCategory(
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
      active: json['active'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'active': active};
  }
}
