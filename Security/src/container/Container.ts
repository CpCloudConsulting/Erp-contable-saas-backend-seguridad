import { UserRepository } from "../infrastructure/persistence/UserRepository";
import { RoleRepository } from "../infrastructure/persistence/RoleRepository";
import { ModuleRepository } from "../infrastructure/persistence/ModuleRepository";
import { getPool } from "../infrastructure/db/pool";
import { CreateUserCompany } from "../application/use-cases/users/CreateUserCompany";
import { FindUserByCompany } from "../application/use-cases/users/FindUserByCompany";
import { FindUserByCognito } from "../application/use-cases/users/FindUserByCognito";
import { UpdateUser } from "../application/use-cases/users/UpdateUser";
import { CreateRole } from "../application/use-cases/role/CreateRole";
import { AsingRole } from "../application/use-cases/role/AsingRole";
import { ListRole } from "../application/use-cases/role/ListRole";
import { ModuleByRole } from "../application/use-cases/role/ModuleByRole";
import { UpdateRole } from "../application/use-cases/role/UpdateRole";
import { CreateModule } from "../application/use-cases/module/CreateModule";
import { ListModule } from "../application/use-cases/module/ListModule";
import { UpdateModule } from "../application/use-cases/module/UpdateModule";
import { AwsLambdaAdapter } from "../infrastructure/aws/lambda/aws-lambda.adapter";
import { ListModuleSubscription } from "../application/use-cases/module/List-Module-subscription";

export class Container {

  private userRepository = new UserRepository(getPool());
  private roleRepository = new RoleRepository(getPool());
  private moduleRepository = new ModuleRepository(getPool());
  private lambdaInvoker = new AwsLambdaAdapter();

  //Funciones de usuarios
  public createUser = new CreateUserCompany(this.userRepository, this.lambdaInvoker);
  public findUserByCompany = new FindUserByCompany(this.userRepository);
  public findUserByCognito = new FindUserByCognito(this.userRepository);
  public updateUser = new UpdateUser(this.userRepository);

  //Funciones de Roles
  public createRole = new CreateRole(this.roleRepository);
  public asignRole = new AsingRole(this.roleRepository);
  public listRole = new ListRole(this.roleRepository);
  public moduleByRole = new ModuleByRole(this.roleRepository);
  public updateRole = new UpdateRole(this.roleRepository);

  // funciones de modulos
  public createModule = new CreateModule(this.moduleRepository);
  public updateModule = new UpdateModule(this.moduleRepository);
  public listModule = new ListModule(this.moduleRepository);
  public listModuleSubscription = new ListModuleSubscription(this.moduleRepository);
}