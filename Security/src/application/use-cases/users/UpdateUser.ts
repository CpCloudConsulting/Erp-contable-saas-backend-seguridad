import { UserRepository } from "../../../infrastructure/persistence/UserRepository";

export class UpdateUser {
  constructor(private repo: UserRepository) {}

  async execute(data: any) {
    return this.repo.updateUser(data);
  }
}