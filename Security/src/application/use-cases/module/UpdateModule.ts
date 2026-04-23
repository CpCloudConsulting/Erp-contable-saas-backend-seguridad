import { Module } from "../../../domain/entities/Module";
import { ModuleRepository } from "../../../infrastructure/persistence/ModuleRepository";

export class UpdateModule {
  constructor(private repo: ModuleRepository) {}

  async execute(data: Module) {
    return this.repo.updateModule(data);
  }
}