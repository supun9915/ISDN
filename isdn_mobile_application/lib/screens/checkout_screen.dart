import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/cart_provider.dart';
import '../providers/auth_provider.dart';
import '../providers/order_provider.dart';
import '../models/order_model.dart';
import '../config/theme.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _formKey = GlobalKey<FormState>();
  final _addressController = TextEditingController();
  final _contactController = TextEditingController();
  final _specialNotesController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Pre-fill with user data
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      if (authProvider.currentUser != null) {
        _addressController.text = authProvider.currentUser!.address;
        _contactController.text = authProvider.currentUser!.contactNumber;
      }
    });
  }

  @override
  void dispose() {
    _addressController.dispose();
    _contactController.dispose();
    _specialNotesController.dispose();
    super.dispose();
  }

  Future<void> _handlePlaceOrder() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final cartProvider = Provider.of<CartProvider>(context, listen: false);
    final orderProvider = Provider.of<OrderProvider>(context, listen: false);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    // Create order items from cart (only productId and quantity for request)
    final orderItems = cartProvider.items.values.map((cartItem) {
      return OrderItem(
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      );
    }).toList();

    // Use a default customer location (you can enhance this with actual geolocation later)
    final customerLocation = {'latitude': '6.014494', 'longitude': '80.256372'};

    final order = Order(
      userId: authProvider.currentUser?.id,
      branchId: authProvider.currentUser?.branchId,
      items: orderItems,
      totalAmount: cartProvider.totalAmount,
      address: _addressController.text.trim(),
      contactNumber: _contactController.text.trim(),
      specialNotes: _specialNotesController.text.trim().isEmpty
          ? 'None'
          : _specialNotesController.text.trim(),
      customerLocation: customerLocation,
    );

    final success = await orderProvider.placeOrder(order);

    if (!mounted) return;

    if (success) {
      // Clear cart
      cartProvider.clear();

      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Order placed successfully!'),
          backgroundColor: AppTheme.success,
        ),
      );

      // Navigate back to home
      Navigator.of(context).popUntil((route) => route.isFirst);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(orderProvider.errorMessage ?? 'Failed to place order'),
          backgroundColor: AppTheme.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cartProvider = Provider.of<CartProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Order Summary Section
              const Text(
                'Order Summary',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),

              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      ...cartProvider.items.values.map((cartItem) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Text(
                                  '${cartItem.product.name} x${cartItem.quantity}',
                                  style: const TextStyle(fontSize: 14),
                                ),
                              ),
                              Text(
                                '\$${cartItem.totalPrice.toStringAsFixed(2)}',
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        );
                      }),
                      const Divider(height: 24),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Total Items:',
                            style: TextStyle(fontSize: 16),
                          ),
                          Text(
                            '${cartProvider.totalQuantity}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Total Amount:',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            '\$${cartProvider.totalAmount.toStringAsFixed(2)}',
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: AppTheme.primaryTeal,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Delivery Information Section
              const Text(
                'Delivery Information',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),

              TextFormField(
                controller: _addressController,
                maxLines: 3,
                decoration: const InputDecoration(
                  labelText: 'Delivery Address',
                  hintText: 'Enter your delivery address',
                  prefixIcon: Icon(Icons.location_on),
                  alignLabelWithHint: true,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter delivery address';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              TextFormField(
                controller: _contactController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'Contact Number',
                  hintText: 'Enter your contact number',
                  prefixIcon: Icon(Icons.phone),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter contact number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              TextFormField(
                controller: _specialNotesController,
                maxLines: 2,
                decoration: const InputDecoration(
                  labelText: 'Special Notes (Optional)',
                  hintText: 'Add any special delivery instructions',
                  prefixIcon: Icon(Icons.note),
                  alignLabelWithHint: true,
                ),
              ),

              const SizedBox(height: 32),

              // Place Order Button
              Consumer<OrderProvider>(
                builder: (context, orderProvider, child) {
                  return SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: orderProvider.isLoading
                          ? null
                          : _handlePlaceOrder,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        child: orderProvider.isLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    AppTheme.white,
                                  ),
                                ),
                              )
                            : const Text(
                                'PLACE ORDER',
                                style: TextStyle(fontSize: 16),
                              ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
