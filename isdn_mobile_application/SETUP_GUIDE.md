# Quick Setup Guide for ISDN Mobile Application

## 🚀 Getting Started

### 1. Configure API URL

**IMPORTANT:** Before running the app, you must configure the API URL to point to your backend server.

**Location:** `lib/services/api_service.dart`

```dart
static const String baseUrl = 'http://localhost:3000/api'; // Change this!
```

### Common API URL Configurations:

#### For Android Emulator:

```dart
static const String baseUrl = 'http://10.0.2.2:3000/api';
```

_Android emulator uses 10.0.2.2 to access the host machine's localhost_

#### For iOS Simulator:

```dart
static const String baseUrl = 'http://localhost:3000/api';
```

#### For Physical Device (same WiFi network):

```dart
static const String baseUrl = 'http://192.168.1.100:3000/api';
```

_Replace 192.168.1.100 with your computer's local IP address_

#### For Production/Deployed Backend:

```dart
static const String baseUrl = 'https://your-api-domain.com/api';
```

---

### 2. How to Find Your Local IP Address

**Windows:**

```bash
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

**macOS/Linux:**

```bash
ifconfig
```

Look for "inet" address under your active network interface (usually en0 or wlan0).

---

### 3. Run the Application

```bash
# Install dependencies (if not already done)
flutter pub get

# Run on connected device/emulator
flutter run

# Or run in debug mode with hot reload
flutter run --debug
```

---

### 4. Backend API Requirements

Ensure your Node.js backend is:

- ✅ Running and accessible
- ✅ Accepting connections from the configured IP/port
- ✅ CORS enabled for mobile requests
- ✅ Returning proper JSON responses

**Test your backend:**

```bash
curl http://your-api-url:3000/api/products
```

---

### 5. Expected API Endpoints

Your backend should implement these endpoints:

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | /api/auth/login   | User authentication   |
| GET    | /api/auth/log     | Get current user info |
| POST   | /api/users        | Create new user       |
| GET    | /api/products     | List all products     |
| GET    | /api/products/:id | Get product details   |
| POST   | /api/orders       | Create new order      |
| GET    | /api/orders       | List user orders      |
| GET    | /api/orders/:id   | Get order details     |

---

### 6. Test Credentials

Ask your backend team for test credentials, or create a new account using the Sign Up screen in the app.

---

### 7. Troubleshooting

#### "Connection refused" or "Network error":

- Check if backend is running: `curl http://your-api-url:3000/api/products`
- Verify API URL is correct in `api_service.dart`
- For physical devices, ensure same WiFi network
- Check firewall settings

#### "401 Unauthorized" errors:

- Token might be expired
- Try logging out and logging back in
- Check backend authentication logic

#### "No products/orders showing":

- Check backend has data
- Verify API response format matches expected structure (see APP_README.md)
- Check browser DevTools/Logcat for API errors

---

## 🎨 Features Overview

### Authentication

- Login with username/password
- Sign up with profile information
- JWT token-based authentication

### Products

- Browse products in grid view
- Filter by category
- Sort by price or name
- Add to cart

### Cart & Checkout

- Manage cart items
- Adjust quantities
- Place orders with delivery info

### Orders

- View order history
- Track order status
- See order details

### Profile

- View user information
- Update profile (if backend supports)
- Logout

---

## 📱 Running on Different Platforms

### Android

```bash
flutter run -d android
```

### iOS

```bash
flutter run -d ios
```

### List available devices

```bash
flutter devices
```

---

## 🔧 Build for Production

### Android APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### iOS (requires Mac)

```bash
flutter build ios --release
```

---

## 📞 Need Help?

1. Check APP_README.md for detailed documentation
2. Review backend API documentation
3. Check Flutter logs: `flutter logs`
4. Contact the development team

---

## ✅ Checklist Before Running

- [ ] Backend API is running
- [ ] API URL configured in `lib/services/api_service.dart`
- [ ] Dependencies installed (`flutter pub get`)
- [ ] Device/emulator connected (`flutter devices`)
- [ ] Test backend accessible (curl/browser)
- [ ] Have test user credentials (or can sign up)

---

**You're all set! Run `flutter run` and enjoy the app! 🎉**
