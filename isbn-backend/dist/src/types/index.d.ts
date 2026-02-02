export interface User {
    id: bigint;
    username: string;
    email: string;
    password: string;
    roleId: bigint;
    name: string;
    contactNumber: string;
    businessName?: string | null;
    customerCode?: string | null;
    address?: string | null;
    district?: string | null;
    customerType?: string | null;
    assignedBranchId?: bigint | null;
    branchId?: bigint | null;
    vehicleId?: bigint | null;
    licenseNumber?: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Role {
    id: bigint;
    roleName: string;
    permissions: string;
    active: boolean;
}
export interface Branch {
    id: bigint;
    name: string;
    code: string;
    region: string;
    address: string;
    contactNumber: string;
    active: boolean;
}
export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    roleId: bigint;
    name: string;
    contactNumber: string;
    businessName?: string;
    customerCode?: string;
    address?: string;
    district?: string;
    customerType?: string;
    assignedBranchId?: bigint;
    branchId?: bigint;
    vehicleId?: bigint;
    licenseNumber?: string;
}
export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    roleId?: bigint;
    name?: string;
    contactNumber?: string;
    businessName?: string;
    customerCode?: string;
    address?: string;
    district?: string;
    customerType?: string;
    assignedBranchId?: bigint;
    branchId?: bigint;
    vehicleId?: bigint;
    licenseNumber?: string;
    active?: boolean;
}
export interface CreateRoleDto {
    roleName: string;
    permissions?: string;
}
export interface UpdateRoleDto {
    roleName?: string;
    permissions?: string;
    active?: boolean;
}
export interface CreateBranchDto {
    name: string;
    code: string;
    region: string;
    address: string;
    contactNumber: string;
}
export interface UpdateBranchDto {
    name?: string;
    code?: string;
    region?: string;
    address?: string;
    contactNumber?: string;
    active?: boolean;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface JwtPayload {
    id: string;
    email: string;
    username: string;
    roleId: string;
    iat?: number;
    exp?: number;
}
