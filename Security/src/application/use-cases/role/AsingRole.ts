import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class AsingRole {
  constructor(private repo: RoleRepository) {}

  async execute(id: number, data: ModulePermission[]) {
    return this.repo.asignRole(id, data);
  }
}