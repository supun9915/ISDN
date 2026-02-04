import { Role, CreateRoleDto, UpdateRoleDto } from "../types";
declare class RoleRepository {
    findAll(): Promise<Role[]>;
    findById(id: string | number): Promise<Role | null>;
    findByName(roleName: string): Promise<Role | null>;
    create(roleData: CreateRoleDto): Promise<Role>;
    update(id: string | number, roleData: UpdateRoleDto): Promise<Role>;
    delete(id: string | number): Promise<Role>;
    checkRoleInUse(id: string | number): Promise<boolean>;
}
declare const _default: RoleRepository;
export default _default;
