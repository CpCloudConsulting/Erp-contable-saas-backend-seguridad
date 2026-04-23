import { Module } from "../entities/Module";
import { Subscription } from "../entities/RolModule";

export interface ModuleRepositoryPort {

  /**
   * Crear un modulo nuevo
   */
  createModule(module: Module): Promise<Module>;

  
  /**
   * Actualiza datos de un modulo
   */
  updateModule(module: Module): Promise<Module>;


   /**
   * Lista todos los modulos
   */
  listModule(): Promise<Module[]>;

  listModuleBySuscription(id: Subscription): Promise<ModuleSubscription[]>;

}