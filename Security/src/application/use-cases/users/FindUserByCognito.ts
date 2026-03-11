import { UserRepository } from "../../../infrastructure/persistence/UserRepository";

export class FindUserByCognito {
  constructor(private repo: UserRepository) {}

  async execute(id: string) {
    return this.repo.getByCognitoId(id);
  }
}