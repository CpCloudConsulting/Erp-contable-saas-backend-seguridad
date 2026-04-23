import { RoleModule } from "../../../domain/entities/RolModule";
import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class ModuleByRole {
  constructor(private repo: RoleRepository) {}

  async execute(data: RoleModule) {
    return this.repo.listModuleByRole(data);
  }
}