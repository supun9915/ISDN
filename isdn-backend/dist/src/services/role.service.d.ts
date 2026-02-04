import { Role, CreateRoleDto, UpdateRoleDto } from "../types";
declare class RoleService {
    getAllRoles(): Promise<Role[]>;
    getRoleById(id: string | number): Promise<Role>;
    createRole(roleData: CreateRoleDto): Promise<Role>;
    updateRole(id: string | number, roleData: UpdateRoleDto): Promise<Role>;
    deleteRole(id: string | number): Promise<Role>;
    activateRole(id: string | number): Promise<Role>;
    deactivateRole(id: string | number): Promise<Role>;
}
declare const _default: RoleService;
export default _default;
