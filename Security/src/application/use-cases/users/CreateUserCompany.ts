import { UserRepository } from "../../../infrastructure/persistence/UserRepository";

export class CreateUserCompany {
  constructor(private repo: UserRepository) {}

  async execute(data: any) {
    return this.repo.createUser(data);
  }
}