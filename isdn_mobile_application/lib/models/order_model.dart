class Order {
  final String? id;
  final String? orderNumber;
  final String? userId;
  final String? branchId;
  final DateTime? orderDate;
  final String status;
  final double totalAmount;
  final DateTime? deliveryDate;
  final String? specialNotes;
  final String? address;
  final String? contactNumber;
  final DateTime? createdAt;
  final String? driverId;
  final Map<String, dynamic>? currentLocation;
  final Map<String, dynamic>? customerLocation;
  final List<OrderItem> items;
  final OrderBranch? branch;
  final OrderDriver? driver;

  Order({
    this.id,
    this.orderNumber,
    this.userId,
    this.branchId,
    this.orderDate,
    this.status = 'Pending',
    required this.totalAmount,
    this.deliveryDate,
    this.specialNotes,
    this.address,
    this.contactNumber,
    this.createdAt,
    this.driverId,
    this.currentLocation,
    this.customerLocation,
    required this.items,
    this.branch,
    this.driver,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id']?.toString(),
      orderNumber: json['orderNumber'],
      userId: json['userId']?.toString(),
      branchId: json['branchId']?.toString(),
      orderDate: json['orderDate'] != null
          ? DateTime.parse(json['orderDate'])
          : null,
      status: json['status'] ?? 'Pending',
      totalAmount: (json['totalAmount'] ?? 0).toDouble(),
      deliveryDate: json['deliveryDate'] != null
          ? DateTime.parse(json['deliveryDate'])
          : null,
      specialNotes: json['specialNotes'],
      address: json['address'],
      contactNumber: json['contactNumber'],
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : null,
      driverId: json['driverId']?.toString(),
      currentLocation: json['currentLocation'],
      customerLocation: json['customerLocation'],
      items:
          (json['items'] as List?)
              ?.map((item) => OrderItem.fromJson(item))
              .toList() ??
          [],
      branch: json['branch'] != null
          ? OrderBranch.fromJson(json['branch'])
          : null,
      driver: json['driver'] != null
          ? OrderDriver.fromJson(json['driver'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      if (orderNumber != null) 'orderNumber': orderNumber,
      if (userId != null) 'userId': int.tryParse(userId!) ?? userId,
      if (branchId != null) 'branchId': int.tryParse(branchId!) ?? branchId,
      'items': items.map((item) => item.toJson()).toList(),
      if (address != null) 'address': address,
      if (contactNumber != null) 'contactNumber': contactNumber,
      if (specialNotes != null) 'specialNotes': specialNotes,
      if (customerLocation != null) 'customerLocation': customerLocation,
    };
  }
}

class OrderItem {
  final String? id;
  final String? orderId;
  final String productId;
  final int quantity;
  final double? unitPrice;
  final double? subtotal;
  final OrderProduct? product;

  OrderItem({
    this.id,
    this.orderId,
    required this.productId,
    required this.quantity,
    this.unitPrice,
    this.subtotal,
    this.product,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id']?.toString(),
      orderId: json['orderId']?.toString(),
      productId: json['productId']?.toString() ?? '',
      quantity: json['quantity'] ?? 0,
      unitPrice: json['unitPrice'] != null
          ? (json['unitPrice'] as num).toDouble()
          : null,
      subtotal: json['subtotal'] != null
          ? (json['subtotal'] as num).toDouble()
          : null,
      product: json['product'] != null
          ? OrderProduct.fromJson(json['product'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': int.tryParse(productId) ?? productId,
      'quantity': quantity,
    };
  }

  // Backwards compatibility
  String get name => product?.name ?? '';
  double get price => unitPrice ?? 0;
  double get totalPrice => subtotal ?? (unitPrice ?? 0) * quantity;
}

class OrderProduct {
  final String id;
  final String productCode;
  final String name;
  final String unitType;
  final String? categoryId;

  OrderProduct({
    required this.id,
    required this.productCode,
    required this.name,
    required this.unitType,
    this.categoryId,
  });

  factory OrderProduct.fromJson(Map<String, dynamic> json) {
    return OrderProduct(
      id: json['id']?.toString() ?? '',
      productCode: json['productCode'] ?? '',
      name: json['name'] ?? '',
      unitType: json['unitType'] ?? '',
      categoryId: json['categoryId']?.toString(),
    );
  }
}

class OrderBranch {
  final String id;
  final String name;
  final String code;
  final String? region;
  final String? address;
  final String? contactNumber;

  OrderBranch({
    required this.id,
    required this.name,
    required this.code,
    this.region,
    this.address,
    this.contactNumber,
  });

  factory OrderBranch.fromJson(Map<String, dynamic> json) {
    return OrderBranch(
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
      code: json['code'] ?? '',
      region: json['region'],
      address: json['address'],
      contactNumber: json['contactNumber'],
    );
  }
}

class OrderDriver {
  final String id;
  final String name;
  final String username;
  final String email;
  final String contactNumber;
  final String? licenseNumber;

  OrderDriver({
    required this.id,
    required this.name,
    required this.username,
    required this.email,
    required this.contactNumber,
    this.licenseNumber,
  });

  factory OrderDriver.fromJson(Map<String, dynamic> json) {
    return OrderDriver(
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
      username: json['username'] ?? '',
      email: json['email'] ?? '',
      contactNumber: json['contactNumber'] ?? '',
      licenseNumber: json['licenseNumber'],
    );
  }
}
