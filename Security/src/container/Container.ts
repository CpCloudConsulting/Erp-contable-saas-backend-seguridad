import { UserRepository } from "../infrastructure/persistence/UserRepository";
import { RoleRepository } from "../infrastructure/persistence/RoleRepository";
import { pool } from "../infrastructure/db/pool";
import { CreateUserCompany } from "../application/use-cases/users/CreateUserCompany";
import { FindUserByCompany } from "../application/use-cases/users/FindUserByCompany";
import { FindUserByCognito } from "../application/use-cases/users/FindUserByCognito";
import { UpdateUser } from "../application/use-cases/users/UpdateUser";
import { CreateRole } from "../application/use-cases/role/CreateRole";
import { AsingRole } from "../application/use-cases/role/AsingRole";
import { ListRole } from "../application/use-cases/role/ListRole";
import { ModuleByRole } from "../application/use-cases/role/ModuleByRole";
import { UpdateRole } from "../application/use-cases/role/UpdateRole";

export class Container {

  private userRepository = new UserRepository(pool);
  private roleRepository = new RoleRepository(pool);

  //Funciones de usuarios
  public createUser = new CreateUserCompany(this.userRepository);
  public findUserByCompany = new FindUserByCompany(this.userRepository);
  public findUserByCognito = new FindUserByCognito(this.userRepository);
  public updateUser = new UpdateUser(this.userRepository);

  //Funciones de Roles
  public createRole = new CreateRole(this.roleRepository);
  public asignRole = new AsingRole(this.roleRepository);
  public listRole = new ListRole(this.roleRepository);
  public moduleByRole = new ModuleByRole(this.roleRepository);
  public updateRole = new UpdateRole(this.roleRepository);
  


}