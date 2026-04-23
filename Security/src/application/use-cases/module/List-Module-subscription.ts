import { Subscription } from "../../../domain/entities/Module";
import { ModuleRepository } from "../../../infrastructure/persistence/ModuleRepository";

export class ListModuleSubscription {
  constructor(private repo: ModuleRepository) {}

  async execute(data: Subscription) {
    return this.repo.listModuleBySuscription(data);
  }
}