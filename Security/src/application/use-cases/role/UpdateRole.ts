import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class UpdateRole {
  constructor(private repo: RoleRepository) {}

  async execute(data: any) {
    return this.repo.updateRole(data);
  }
}