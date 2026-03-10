import { CompanyRepository } from "../../../infrastructure/persistence/UserRepository";

export class CompanyList {
  constructor(private repo: CompanyRepository) {}

  async execute() {
    return this.repo.ActiveCompany();
  }
}