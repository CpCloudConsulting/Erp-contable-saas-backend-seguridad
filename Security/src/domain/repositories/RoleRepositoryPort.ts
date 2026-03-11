import { Role } from "../entities/Role";
import { RoleModule } from "../entities/RolModule";

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

   /**
   * asignar un rol
   */
  asignRole(id: string, moduleIds: string[]): Promise<RoleModule | null>;


   /**
   * Lista modulos permitidos por role
   */
  listModuleByRole(id: string): Promise<string[]>;


}