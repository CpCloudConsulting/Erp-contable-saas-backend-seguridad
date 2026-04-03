import { ModuleRepository } from "../../../infrastructure/persistence/ModuleRepository";

export class CreateModule {
  constructor(private repo: ModuleRepository) {}

  async execute(data: any) {
    return this.repo.createModule(data);
  }
}