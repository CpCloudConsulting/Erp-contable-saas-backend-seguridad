import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class ListRole {
  constructor(private repo: RoleRepository) {}

  async execute(id: number) {
    return this.repo.listRole(id);
  }
}