import 'package:flutter/foundation.dart';
import '../models/order_model.dart';
import '../services/api_service.dart';

class OrderProvider with ChangeNotifier {
  final ApiService _apiService;
  List<Order> _orders = [];
  bool _isLoading = false;
  String? _errorMessage;

  OrderProvider(this._apiService);

  List<Order> get orders => _orders;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<bool> placeOrder(Order order) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final orderData = order.toJson();
      final response = await _apiService.createOrder(orderData);

      // Check if order was created successfully
      if (response['success'] == true) {
        _isLoading = false;
        notifyListeners();

        // Reload orders after placing new one with same userId and branchId
        await loadOrders(userId: order.userId, branchId: order.branchId);
        return true;
      } else {
        _errorMessage = response['message'] ?? 'Failed to create order';
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> loadOrders({String? userId, String? branchId}) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiService.getOrders(
        userId: userId,
        branchId: branchId,
      );
      _orders = response.map((json) => Order.fromJson(json)).toList();

      // Sort by date, most recent first
      _orders.sort((a, b) {
        if (a.createdAt == null) return 1;
        if (b.createdAt == null) return -1;
        return b.createdAt!.compareTo(a.createdAt!);
      });

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
