import { UserRepository } from "../../../infrastructure/persistence/UserRepository";

export class FindUserByCompany {
  constructor(private repo: UserRepository) {}

  async execute(id: number) {
    return this.repo.userByCompany(id);
  }
}