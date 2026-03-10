import { Role } from "../entities/Role";

export interface RolePermitionRepositoryPort {

  /**
   * Crear un rol nuevo
   */
  asignRole(role: Role): Promise<Role>;

  
  /**
   * Actualiza permisos de un role
   */
  updatePermitionRole(id: string): Promise<Role>;


   /**
   * Lista permisos por role
   */
  listPermitionByRole(id: string): Promise<Role>;


}