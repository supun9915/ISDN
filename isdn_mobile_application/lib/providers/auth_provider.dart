import 'package:flutter/foundation.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _apiService;
  User? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  AuthProvider(this._apiService);

  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _currentUser != null;

  Future<bool> login(String username, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiService.login(username, password);

      // Extract user data from response
      if (response['user'] != null) {
        _currentUser = User.fromJson(response['user']);
      } else if (response['data'] != null && response['data']['user'] != null) {
        _currentUser = User.fromJson(response['data']['user']);
      }

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> signUp(Map<String, dynamic> userData) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _apiService.signUp(userData);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> loadCurrentUser() async {
    try {
      final response = await _apiService.getCurrentUser();
      if (response['user'] != null) {
        _currentUser = User.fromJson(response['user']);
      } else if (response['data'] != null) {
        _currentUser = User.fromJson(response['data']);
      }
      notifyListeners();
    } catch (e) {
      // Failed to load user, possibly token expired
      _currentUser = null;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    await _apiService.logout();
    _currentUser = null;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
