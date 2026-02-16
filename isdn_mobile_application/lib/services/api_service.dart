import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.8.119:3100/isdn/api';
  static const String imageBaseUrl =
      'http://192.168.8.119:3100'; // For image URLs
  late Dio _dio;
  String? _token;
  String? _branchId;

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    // Add interceptor for token and branchId
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          if (_token != null) {
            options.headers['Authorization'] = 'Bearer $_token';
          }
          if (_branchId != null) {
            options.headers['branchId'] = _branchId;
          }
          return handler.next(options);
        },
        onError: (error, handler) {
          // Handle common errors
          if (error.response?.statusCode == 401) {
            // Token expired or invalid
            _token = null;
            _clearToken();
          }
          return handler.next(error);
        },
      ),
    );

    // Load token and branchId from storage
    _loadToken();
    _loadBranchId();
  }

  Future<void> _loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
  }

  Future<void> _loadBranchId() async {
    final prefs = await SharedPreferences.getInstance();
    _branchId = prefs.getString('branch_id');
  }

  Future<void> _saveToken(String token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  Future<void> _saveBranchId(String branchId) async {
    _branchId = branchId;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('branch_id', branchId);
  }

  Future<void> _clearToken() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    await prefs.remove('branch_id');
  }

  bool get isAuthenticated => _token != null;

  // Authentication endpoints
  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await _dio.post(
        '/auth/login',
        data: {'username': username, 'password': password},
      );

      // Handle response format: { success, data: { token, user }, message }
      if (response.data['success'] == true && response.data['data'] != null) {
        final data = response.data['data'];
        if (data['token'] != null) {
          await _saveToken(data['token']);
        }
        // Save branchId from user data
        if (data['user'] != null && data['user']['branchId'] != null) {
          await _saveBranchId(data['user']['branchId'].toString());
        }
        return data; // Return the data object containing token and user
      } else if (response.data['token'] != null) {
        // Fallback for direct token in response
        await _saveToken(response.data['token']);
        if (response.data['user'] != null &&
            response.data['user']['branchId'] != null) {
          await _saveBranchId(response.data['user']['branchId'].toString());
        }
        return response.data;
      }

      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<Map<String, dynamic>> signUp(Map<String, dynamic> userData) async {
    try {
      final response = await _dio.post('/users', data: userData);
      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<void> logout() async {
    await _clearToken();
  }

  Future<Map<String, dynamic>> getCurrentUser() async {
    try {
      final response = await _dio.get('/auth/log');
      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // Product endpoints
  Future<List<dynamic>> getProducts({
    String? categoryId,
    String? sortBy,
  }) async {
    try {
      final queryParams = <String, dynamic>{};
      if (categoryId != null && categoryId.isNotEmpty) {
        queryParams['categoryId'] = categoryId;
      }
      if (sortBy != null && sortBy.isNotEmpty) {
        queryParams['sortBy'] = sortBy;
      }

      final response = await _dio.get(
        '/products',
        queryParameters: queryParams.isEmpty ? null : queryParams,
      );

      // Handle response format: { success, data: [...] }
      if (response.data is Map && response.data['success'] == true) {
        if (response.data['data'] is List) {
          return response.data['data'];
        }
      } else if (response.data is List) {
        return response.data;
      }

      return [];
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<List<dynamic>> getProductCategories() async {
    try {
      final response = await _dio.get('/product-categories/');

      // Handle response format: { success, data: [...] }
      if (response.data is Map && response.data['success'] == true) {
        if (response.data['data'] is List) {
          return response.data['data'];
        }
      } else if (response.data is List) {
        return response.data;
      }

      return [];
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<Map<String, dynamic>> getProductById(String id) async {
    try {
      final response = await _dio.get('/products/$id');
      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // Order endpoints
  Future<Map<String, dynamic>> createOrder(
    Map<String, dynamic> orderData,
  ) async {
    try {
      final response = await _dio.post('/orders', data: orderData);

      // Handle response format: { success, data: {...}, message }
      if (response.data is Map && response.data['success'] == true) {
        return response.data;
      }

      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<List<dynamic>> getOrders({String? userId, String? branchId}) async {
    try {
      final queryParams = <String, dynamic>{};

      // Add userId and branchId as query parameters
      if (userId != null) {
        queryParams['userId'] = userId;
      }
      if (branchId != null) {
        queryParams['branchId'] = branchId;
      }

      final response = await _dio.get(
        '/orders',
        queryParameters: queryParams.isEmpty ? null : queryParams,
      );

      // Handle different response formats
      if (response.data is Map && response.data['success'] == true) {
        if (response.data['data'] is List) {
          return response.data['data'];
        }
      } else if (response.data is List) {
        return response.data;
      } else if (response.data is Map && response.data['orders'] != null) {
        return response.data['orders'];
      }

      return [];
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  Future<Map<String, dynamic>> getOrderById(String id) async {
    try {
      final response = await _dio.get('/orders/$id');
      return response.data;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // Error handling
  String _handleError(DioException error) {
    if (error.response != null) {
      final data = error.response!.data;
      if (data is Map && data['message'] != null) {
        return data['message'];
      }
      if (data is Map && data['error'] != null) {
        return data['error'];
      }
      return 'Server error: ${error.response!.statusCode}';
    } else if (error.type == DioExceptionType.connectionTimeout) {
      return 'Connection timeout. Please check your internet connection.';
    } else if (error.type == DioExceptionType.receiveTimeout) {
      return 'Server response timeout.';
    } else if (error.type == DioExceptionType.connectionError) {
      return 'Connection error. Please check your internet connection.';
    }
    return 'An unexpected error occurred: ${error.message}';
  }
}
