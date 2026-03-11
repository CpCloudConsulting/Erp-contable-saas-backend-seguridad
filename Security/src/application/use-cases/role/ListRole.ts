import { RoleRepository } from "../../../infrastructure/persistence/RoleRepository";

export class ListRole {
  constructor(private repo: RoleRepository) {}

  async execute() {
    return this.repo.listRole();
  }
}