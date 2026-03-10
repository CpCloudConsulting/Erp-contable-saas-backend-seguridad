import { Role } from "../entities/Role";

export interface RoleRepositoryPort {

  /**
   * Crear un rol nuevo
   */
  createRole(role: Role): Promise<Role>;

  
  /**
   * Actualiza datos de un rol
   */
  updateRole(role: Role): Promise<Role>;


   /**
   * Lista todos los roles
   */
  listRole(): Promise<Role>;


}