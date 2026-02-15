# ISDN Mobile App - User Flow & Navigation

## 🗺️ Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        APP LAUNCH                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ LOGIN SCREEN  │
                    └───────┬───────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Sign Up  │    │  Login   │    │  Error   │
    │  Form    │    │ Success  │    │ Message  │
    └──────────┘    └────┬─────┘    └──────────┘
                         │
                         ▼
                ┌────────────────┐
                │  HOME SCREEN   │
                │  (Navigation)  │
                └────────┬───────┘
                         │
        ┌────────────────┼────────────────┬──────────────┐
        │                │                │              │
        ▼                ▼                ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐
│   PRODUCTS   │ │    ORDERS    │ │   PROFILE    │ │  CART  │
│   (Tab 1)    │ │   (Tab 2)    │ │   (Tab 3)    │ │  (FAB) │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └────┬───┘
       │                │                │              │
       │                │                │              │
       ▼                ▼                ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐
│ Filter/Sort  │ │ Order Details│ │    Logout    │ │   Items    │
│ Add to Cart  │ │ Pull Refresh │ │              │ │ Quantities │
│ Pull Refresh │ │              │ │              │ │   Totals   │
└──────┬───────┘ └──────────────┘ └──────────────┘ └────┬───────┘
       │                                                  │
       │                                                  ▼
       │                                          ┌──────────────┐
       │                                          │   CHECKOUT   │
       │                                          │   Address    │
       │                                          │   Contact    │
       └──────────────────────────────────────────►  Summary    │
                                                 └──────┬───────┘
                                                        │
                                                        ▼
                                                 ┌──────────────┐
                                                 │ Place Order  │
                                                 │   Success    │
                                                 └──────────────┘
```

---

## 📱 Screen Navigation Map

### Entry Point

```
LoginScreen
├── Sign Up → SignUpScreen → Back to LoginScreen
└── Login Success → HomeScreen
```

### Main Navigation (HomeScreen with Bottom Nav)

```
HomeScreen
├── Tab 1: ProductsScreen
│   ├── Filter Dialog (Category, Sort)
│   └── Add to Cart (Snackbar confirmation)
│
├── Tab 2: OrdersScreen
│   ├── Order Card (collapsed)
│   └── Expand → Full Order Details
│
├── Tab 3: ProfileScreen
│   └── Logout → LoginScreen
│
└── FAB: CartScreen
    ├── Adjust Quantities
    ├── Remove Items
    └── Checkout → CheckoutScreen
                  └── Place Order → Back to HomeScreen
```

---

## 🎯 User Journey Examples

### Journey 1: New User Registration

```
1. Open App → Login Screen
2. Tap "CREATE ACCOUNT" → Sign Up Screen
3. Fill in all details (Name, Username, Email, etc.)
4. Select Role and Branch
5. Tap "SIGN UP" → Success message
6. Return to Login Screen
7. Enter credentials → Login → Home Screen
```

### Journey 2: Browse and Purchase

```
1. Login → Home Screen (Products Tab)
2. See product grid
3. Tap Filter icon → Select category / Sort by price
4. Tap cart icon on product → "Added to cart" message
5. Add more products
6. Tap Cart FAB (Floating Action Button)
7. Review cart items
8. Adjust quantities with +/- buttons
9. Tap "PROCEED TO CHECKOUT"
10. Review order summary
11. Edit delivery address if needed
12. Tap "PLACE ORDER"
13. Success message → Return to Home
14. Go to Orders tab → See new order (Status: Pending)
```

### Journey 3: View Order History

```
1. Home Screen → Orders Tab
2. See list of all orders
3. Tap on order card → Expands to show:
   - All items with quantities
   - Delivery address
   - Contact number
   - Date/Time
4. See status badge (Pending/Delivered)
5. Pull down → Refresh order list
```

### Journey 4: Manage Profile

```
1. Home Screen → Profile Tab
2. View user information:
   - Name, Username
   - Email, Phone
   - Address
   - Role, Branch
3. Tap Logout icon
4. Confirm logout → Return to Login Screen
```

---

## 🎨 Screen Components Breakdown

### LoginScreen

```
┌─────────────────────────────────┐
│         [App Icon/Logo]         │
│      IslandLink ISDN           │
│  Sales Distribution Network     │
├─────────────────────────────────┤
│  Username: [____________]      │
│  Password: [____________] 👁️   │
│                                 │
│      [     LOGIN      ]        │
│      [ CREATE ACCOUNT ]        │
└─────────────────────────────────┘
```

### SignUpScreen

```
┌─────────────────────────────────┐
│       ← Create Account          │
├─────────────────────────────────┤
│  Full Name:     [____________]  │
│  Username:      [____________]  │
│  Email:         [____________]  │
│  Contact:       [____________]  │
│  Address:       [____________]  │
│                 [____________]  │
│  Role:          [▼ Dropdown  ]  │
│  Branch:        [▼ Dropdown  ]  │
│  Password:      [____________] 👁️│
│  Confirm:       [____________] 👁️│
│                                 │
│      [     SIGN UP     ]       │
└─────────────────────────────────┘
```

### HomeScreen (Products Tab)

```
┌─────────────────────────────────┐
│     Products            🔍 ≡    │
├─────────────────────────────────┤
│ ┌────────┐  ┌────────┐         │
│ │ [IMG]  │  │ [IMG]  │         │
│ │ Product│  │ Product│         │
│ │ Name   │  │ Name   │         │
│ │ $10.99 │🛒│ $15.99 │🛒       │
│ └────────┘  └────────┘         │
│ ┌────────┐  ┌────────┐         │
│ │ [IMG]  │  │ [IMG]  │         │
│ │ Product│  │ Product│         │
│ │ Name   │  │ Name   │         │
│ │ $12.99 │🛒│ $20.99 │🛒       │
│ └────────┘  └────────┘         │
├─────────────────────────────────┤
│  🛍️      📋      👤        🛒(2)│
│Products Orders Profile          │
└─────────────────────────────────┘
```

### CartScreen

```
┌─────────────────────────────────┐
│     ← My Cart                   │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [IMG] Product Name    $10.99│ │
│ │       ⊖  2  ⊕        $21.98│ │🗑️
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [IMG] Product Name    $15.99│ │
│ │       ⊖  1  ⊕        $15.99│ │🗑️
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Total Items:              3     │
│ Total Amount:         $37.97    │
│  [ PROCEED TO CHECKOUT ]       │
└─────────────────────────────────┘
```

### CheckoutScreen

```
┌─────────────────────────────────┐
│     ← Checkout                  │
├─────────────────────────────────┤
│ Order Summary                   │
│ ┌─────────────────────────────┐ │
│ │ Product Name x2    $21.98   │ │
│ │ Product Name x1    $15.99   │ │
│ ├─────────────────────────────┤ │
│ │ Total Items: 3              │ │
│ │ Total Amount: $37.97        │ │
│ └─────────────────────────────┘ │
│                                 │
│ Delivery Information            │
│ Address:  [_________________]   │
│           [_________________]   │
│           [_________________]   │
│ Contact:  [_________________]   │
│                                 │
│    [    PLACE ORDER    ]       │
└─────────────────────────────────┘
```

### OrdersScreen

```
┌─────────────────────────────────┐
│     Order History               │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Order #12345678   [Pending] ▼│ │
│ │ Jan 15, 2026 - 10:30 AM     │ │
│ │ 🛍️ 3 items  💰 $37.97       │ │
│ ├─────────────────────────────┤ │
│ │ Items:                      │ │
│ │ • Product Name x2  $21.98   │ │
│ │ • Product Name x1  $15.99   │ │
│ │ 📍 123 Main St, City        │ │
│ │ 📞 +1234567890              │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Order #87654321 [Delivered]▼│ │
│ │ Jan 10, 2026 - 02:15 PM     │ │
│ │ 🛍️ 5 items  💰 $89.50       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│  🛍️      📋      👤            │
│Products Orders Profile          │
└─────────────────────────────────┘
```

### ProfileScreen

```
┌─────────────────────────────────┐
│     My Profile          ⎆ Logout│
├─────────────────────────────────┤
│           ┌───┐                 │
│           │ J │                 │
│           └───┘                 │
│        John Doe                 │
│        @johndoe                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 📧  Email                   │ │
│ │     john@example.com        │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📞  Contact Number          │ │
│ │     +1234567890             │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📍  Address                 │ │
│ │     123 Main St, City       │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 💼  Role                    │ │
│ │     Customer                │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🏢  Branch                  │ │
│ │     Colombo                 │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│  🛍️      📋      👤            │
│Products Orders Profile          │
└─────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
User Action (UI)
      ↓
Provider Method Call
      ↓
Update _isLoading = true
      ↓
notifyListeners() → UI shows loading
      ↓
API Service Call
      ↓
Response Received
      ↓
Update State Variables
      ↓
notifyListeners() → UI updates with data
```

### Example: Login Flow

```
1. User taps LOGIN button
2. LoginScreen calls authProvider.login()
3. AuthProvider sets _isLoading = true
4. UI shows loading spinner
5. ApiService.login() called
6. API returns JWT token + user data
7. Token saved to SharedPreferences
8. User data stored in AuthProvider
9. _isLoading = false, notifyListeners()
10. LoginScreen navigates to HomeScreen
```

---

## 🎯 Key Interactions

### Add to Cart

```
ProductCard
  → Tap "Add" icon
  → CartProvider.addItem(product)
  → Cart updated
  → Badge on FAB updates
  → Snackbar: "Added to cart"
```

### Filter Products

```
ProductsScreen
  → Tap Filter icon
  → Dialog opens
  → Select category chip
  → ProductProvider.filterByCategory()
  → Product list updates
  → Dialog closes
```

### Place Order

```
CheckoutScreen
  → Tap "PLACE ORDER"
  → OrderProvider.placeOrder()
  → API creates order
  → CartProvider.clear()
  → Navigate back to Home
  → Snackbar: "Order placed!"
```

---

## 📊 Data Flow

```
API (Backend)
    ↕️
ApiService
    ↕️
Providers (State)
    ↕️
UI Screens (Widgets)
    ↕️
User
```

---

## 🎨 Color Coding

### Status Colors

- 🟠 **Pending**: Orange (#FF9800)
- 🟢 **Delivered**: Green (#4CAF50)
- 🔴 **Cancelled**: Red (#F44336)

### UI Colors

- 🔵 **Primary**: Dark Teal (#006B7D)
- ⚪ **Background**: Off-white (#F5F5F5)
- ⚫ **Text**: Dark Grey (#424242)
- 🔘 **Accent**: Bright Teal (#00A0B0)

---

## ✨ Interactive Elements

### Buttons

- **Elevated**: Primary actions (Login, Sign Up, Place Order)
- **Outlined**: Secondary actions (Create Account)
- **Text**: Tertiary actions (Cancel, Clear)
- **Icon**: Quick actions (Add to cart, Remove, Filter)
- **FAB**: Main floating action (Cart)

### Inputs

- **Text Fields**: User input (username, email, etc.)
- **Dropdowns**: Selection (Role, Branch)
- **Number Controls**: Quantity (+/- buttons)
- **Toggle**: Password visibility (👁️ icon)

### Feedback

- **Snackbars**: Quick messages (Added to cart, Success)
- **Dialogs**: Confirmations (Logout, Filters)
- **Progress**: Loading states (CircularProgressIndicator)
- **Badges**: Notifications (Cart count)

---

This visual guide helps understand the complete user experience and navigation flow of the ISDN Mobile Application! 🎉
