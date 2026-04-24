import { Pool } from "pg";
import { ModuleRepositoryPort } from "../../domain/repositories/ModuleRepositoryPort";
import { ModelSubscription, Module, Subscription } from "../../domain/entities/Module";

export class ModuleRepository implements ModuleRepositoryPort {

  constructor(private pool: Pool) {}

  async createModule(module: Module): Promise<Module>{
    const result = await this.pool.query(
      `INSERT INTO core.modulos (nombre, is_active)
       VALUES ($1, $2) RETURNING *`,
      [module.nombre, module.is_active]
    );
    const row = result.rows[0];
    return new Module(
      row.id_mod,
      row.nombre,
      row.is_active
    );
  }

 
 async updateModule(module: Module): Promise<Module>{
    const result = await this.pool.query(
      `UPDATE core.modulos SET nombre=$2, is_active=$3
       WHERE id_mod=$1 RETURNING *`,
      [module.id, module.nombre, module.is_active]
    );
    const row = result.rows[0];
    return new Module(
      row.id_mod,
      row.nombre,
      row.is_active
    );
}


  async listModule(): Promise<Module[]>{
    const result = await this.pool.query(
      `SELECT id_mod, nombre, is_active FROM core.modulos`
    ); 
    return result.rows.map(row => new Module(
      row.id_mod,
      row.nombre,
      row.is_active
    ));     
  }

  async listModuleBySuscription(id: Subscription): Promise<ModuleSubscription[]> {
    const result = await this.pool.query(
      `SELECT DISTINCT
          m.id_mod,
          m.nombre
        FROM core.suscripciones s
        JOIN core.plan_modulos pm 
          ON pm.id_plan = s.id_plan
        JOIN core.modulos m 
          ON m.id_mod = pm.id_mod
        WHERE 
          s.id_empresa = $1
          AND s.estado = 'ACTIVA'
          AND (s.fecha_fin IS NULL OR s.fecha_fin >= CURRENT_DATE)
          AND pm.is_active = TRUE
          AND m.is_active = TRUE;`, [id.idEmp]
    );
    return result.rows.map(
        row => new ModelSubscription(
          row.id_mod,
          row.nombre,
          false,
          false,
          false
        )
      );
  }

}