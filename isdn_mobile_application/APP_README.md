# IslandLink Sales Distribution Network (ISDN) - Mobile Application

A Flutter mobile application for the IslandLink Sales Distribution Network that connects to a Node.js REST API backend.

## Features

### 1. Authentication Module

- **Login**: Secure login with username and password
- **Sign Up**: User registration with comprehensive profile information
- **JWT-based authentication**: Secure token-based authentication
- **Persistent login**: Token stored securely for subsequent API calls

### 2. Product Management

- **Product Browser**: Grid view displaying products with images, names, categories, and prices
- **Filters**: Filter products by category
- **Sorting**: Sort products by price (low to high, high to low) or name
- **Add to Cart**: Quick add-to-cart functionality from product listings

### 3. Cart System

- **View Cart**: See all items in cart with quantities
- **Adjust Quantities**: Increase or decrease item quantities
- **Remove Items**: Delete items from cart
- **Cart Summary**: Real-time total calculation

### 4. Checkout & Orders

- **Place Order**: Checkout with delivery address and contact information
- **Order Confirmation**: Order summary before placing
- **Order History**: View all past orders with status tracking
- **Order Details**: Expandable order cards showing items, delivery info, and dates

### 5. Profile & Account

- **Profile Display**: View user information (Name, Email, Address, Branch, Role)
- **Account Management**: Easy access to user details
- **Logout**: Secure logout functionality

## Technology Stack

- **Flutter SDK**: ^3.11.0
- **State Management**: Provider
- **HTTP Client**: Dio
- **Local Storage**: SharedPreferences
- **Secure Storage**: flutter_secure_storage
- **Image Caching**: cached_network_image
- **UI Components**: Material Design 3
- **Date Formatting**: intl

## Project Structure

```
lib/
├── config/
│   └── theme.dart                 # App theme and color scheme
├── models/
│   ├── user_model.dart            # User data model
│   ├── product_model.dart         # Product data model
│   ├── order_model.dart           # Order data model
│   └── cart_item_model.dart       # Cart item model
├── providers/
│   ├── auth_provider.dart         # Authentication state management
│   ├── cart_provider.dart         # Cart state management
│   ├── product_provider.dart      # Product state management
│   └── order_provider.dart        # Order state management
├── services/
│   └── api_service.dart           # API integration layer
├── screens/
│   ├── login_screen.dart          # Login interface
│   ├── signup_screen.dart         # Registration interface
│   ├── home_screen.dart           # Main navigation hub
│   ├── products_screen.dart       # Product browsing
│   ├── cart_screen.dart           # Shopping cart
│   ├── checkout_screen.dart       # Order placement
│   ├── orders_screen.dart         # Order history
│   └── profile_screen.dart        # User profile
└── main.dart                      # Application entry point
```

## Setup Instructions

### Prerequisites

- Flutter SDK (3.11.0 or higher)
- Dart SDK
- Android Studio / Xcode (for device emulators)
- Node.js backend API running

### Installation

1. **Clone the repository**

   ```bash
   cd "d:\Top Up\ASE\Coursework 01\System\Mobile Application\isdn_mobile_application"
   ```

2. **Install dependencies**

   ```bash
   flutter pub get
   ```

3. **Configure API URL**

   Open `lib/services/api_service.dart` and update the base URL:

   ```dart
   static const String baseUrl = 'http://your-api-url:3000/api';
   ```

   **Important Notes:**
   - For Android emulator: Use `http://10.0.2.2:3000/api` to access localhost
   - For iOS simulator: Use `http://localhost:3000/api`
   - For physical device: Use your computer's local IP address, e.g., `http://192.168.1.100:3000/api`

4. **Run the application**
   ```bash
   flutter run
   ```

### API Endpoints Used

The application expects the following REST API endpoints:

- **Authentication**
  - `POST /api/auth/login` - User login
  - `GET /api/auth/log` - Get current user
  - `POST /api/users` - Create new user account

- **Products**
  - `GET /api/products` - Get all products (supports ?category=xxx)
  - `GET /api/products/:id` - Get product by ID

- **Orders**
  - `POST /api/orders` - Create new order
  - `GET /api/orders` - Get user's orders
  - `GET /api/orders/:id` - Get order by ID

## Configuration

### Theme Customization

The app uses a professional dark teal and white color scheme. To customize colors, edit `lib/config/theme.dart`:

```dart
static const Color primaryTeal = Color(0xFF006B7D);
static const Color darkTeal = Color(0xFF004D5C);
static const Color lightTeal = Color(0xFF008CA3);
```

### API Response Format

The API service handles various response formats. Ensure your backend returns data in one of these formats:

**Products Response:**

```json
// Option 1: Direct array
[{ "id": "...", "name": "...", "price": 10.99 }]

// Option 2: Wrapped in 'products' key
{ "products": [{ "id": "...", "name": "...", "price": 10.99 }] }

// Option 3: Wrapped in 'data' key
{ "data": [{ "id": "...", "name": "...", "price": 10.99 }] }
```

**Authentication Response:**

```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "john",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

## Building for Production

### Android

```bash
flutter build apk --release
```

### iOS

```bash
flutter build ios --release
```

## Troubleshooting

### Connection Issues

- Ensure the backend API is running and accessible
- Check firewall settings if using a physical device
- For Android emulator, verify you're using `10.0.2.2` instead of `localhost`

### Build Errors

```bash
flutter clean
flutter pub get
flutter run
```

### Token Expired

- The app automatically clears expired tokens
- Users will be redirected to login when token is invalid

## Design Features

### Color Scheme

- **Primary**: Dark Teal (#006B7D)
- **Accent**: Bright Teal (#00A0B0)
- **Background**: Off-white (#F5F5F5)
- **Text**: Dark Grey (#424242)

### UI Components

- Material Design 3
- Responsive layouts
- Bottom navigation for main sections
- Floating action button for cart access
- Badge indicators for cart items
- Pull-to-refresh on lists
- Loading states and error handling

## Security

- JWT tokens stored securely using SharedPreferences
- Passwords not stored locally
- Automatic token refresh handling
- Secure HTTPS communication (when backend supports it)

## Future Enhancements

- Push notifications for order updates
- Product search functionality
- Wishlist/favorites
- Multiple delivery addresses
- Payment gateway integration
- Order tracking with map view
- Product reviews and ratings
- Dark mode support

## License

Private project for IslandLink Sales Distribution Network

## Support

For issues or questions, contact the development team.
