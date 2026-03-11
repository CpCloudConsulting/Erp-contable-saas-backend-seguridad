import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class ModuleByRole {
  constructor(private repo: RoleRepository) {}

  async execute(data: any) {
    return this.repo.listModuleByRole(data);
  }
}