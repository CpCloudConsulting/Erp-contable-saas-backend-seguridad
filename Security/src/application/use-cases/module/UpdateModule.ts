import { ModuleRepository } from "../../../infrastructure/persistence/ModuleRepository";

export class UpdateModule {
  constructor(private repo: ModuleRepository) {}

  async execute(data: any) {
    return this.repo.updateModule(data);
  }
}