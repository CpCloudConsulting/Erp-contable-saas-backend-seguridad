import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class CreateRole {
  constructor(private repo: RoleRepository) {}

  async execute(data: any) {
    return this.repo.createRole(data);
  }
}