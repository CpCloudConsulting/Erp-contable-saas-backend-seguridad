import { CompanyRepository } from "../../../infrastructure/persistence/UserRepository";

export class FindCompany {
  constructor(private repo: CompanyRepository) {}

  async execute(id: any) {
    return this.repo.getById(id);
  }
}