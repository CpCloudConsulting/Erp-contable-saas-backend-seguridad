import { CompanyRepository } from "../../../infrastructure/persistence/UserRepository";

export class UpdateCompany {
  constructor(private repo: CompanyRepository) {}

  async execute(data: any) {
    return this.repo.update(data);
  }
}