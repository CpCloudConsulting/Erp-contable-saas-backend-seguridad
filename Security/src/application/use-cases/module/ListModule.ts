import { ModuleRepository } from "../../../infrastructure/persistence/ModuleRepository";

export class ListModule {
  constructor(private repo: ModuleRepository) {}

  async execute() {
    return this.repo.listModule();
  }
}