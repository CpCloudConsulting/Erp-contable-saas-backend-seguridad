import { User } from "../entities/User";

export interface UserRepositoryPort {

  /**
   * Crear un usuario nuevo
   */
  createUser(user: User): Promise<User>;

  /**
   * Actualiza datos de un usuario
   */
  updateUser(user: User): Promise<User>;

  /**
   * Obtiene usuario por ID
   */
  userByCompany(id: number): Promise<User | null>;


  getByCognitoId(id: string): Promise<User | null>;


}