class User {
  final String? id;
  final String name;
  final String username;
  final String email;
  final String address;
  final String contactNumber;
  final String? roleId;
  final String? roleName;
  final String? branchId;
  final String? branchName;

  User({
    this.id,
    required this.name,
    required this.username,
    required this.email,
    required this.address,
    required this.contactNumber,
    this.roleId,
    this.roleName,
    this.branchId,
    this.branchName,
  });

  // Helper getter for backwards compatibility
  String get fullName => name;

  factory User.fromJson(Map<String, dynamic> json) {
    // Extract role name from nested role object or direct field
    String? roleName;
    if (json['role'] != null && json['role'] is Map) {
      roleName = json['role']['roleName'];
    } else if (json['roleName'] != null) {
      roleName = json['roleName'];
    }

    // Extract branch name from nested branch object or direct field
    String? branchName;
    if (json['branch'] != null && json['branch'] is Map) {
      branchName = json['branch']['name'];
    } else if (json['branchName'] != null) {
      branchName = json['branchName'];
    }

    return User(
      id: json['_id']?.toString() ?? json['id']?.toString(),
      name: json['name'] ?? json['fullName'] ?? json['full_name'] ?? '',
      username: json['username'] ?? '',
      email: json['email'] ?? '',
      address: json['address'] ?? '',
      contactNumber: json['contactNumber'] ?? json['contact_number'] ?? '',
      roleId: json['roleId']?.toString(),
      roleName: roleName,
      branchId: json['branchId']?.toString(),
      branchName: branchName,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'name': name,
      'username': username,
      'email': email,
      'address': address,
      'contactNumber': contactNumber,
      if (roleId != null) 'roleId': roleId,
      if (roleName != null) 'roleName': roleName,
      if (branchId != null) 'branchId': branchId,
      if (branchName != null) 'branchName': branchName,
    };
  }
}
