import { CompanyRepository } from "../../../infrastructure/persistence/UserRepository";

export class CreateCompany {
  constructor(private repo: CompanyRepository) {}

  async execute(data: any) {
    return this.repo.createCompany(data);
  }
}