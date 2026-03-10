import { CompanyRepository } from "../../../infrastructure/persistence/UserRepository";

export class DesactiveCompany {
  constructor(private repo: CompanyRepository) {}

  async execute(id: number) {
    return this.repo.DesactiveCompany(id);
  }
}