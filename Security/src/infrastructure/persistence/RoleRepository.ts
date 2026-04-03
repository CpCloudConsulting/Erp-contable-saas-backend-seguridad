import { Pool } from "pg";
import { Role } from "../../domain/entities/Role";
import { RoleRepositoryPort } from "../../domain/repositories/RoleRepositoryPort";
import { RoleModule } from "../../domain/entities/RolModule";

export class RoleRepository implements RoleRepositoryPort {

  constructor(private pool: Pool) {}


  async asignRole(id: number, moduleIds: number[]): Promise<RoleModule[]> {

      const result = await this.pool.query(
        `INSERT INTO core.rol_modulos (id_rol, id_mod)
        SELECT $1, UNNEST($2::int[])
        ON CONFLICT (id_rol, id_mod) DO NOTHING
        RETURNING id_rol, id_mod`,
        [id, moduleIds]
      );

      return result.rows.map(
        row => new RoleModule(row.id_rol, row.id_mod)
      );
  }

  async listModuleByRole(id: string): Promise<string[]> {

      const result = await this.pool.query(
        `SELECT m.nombre
        FROM core.rol_modulos rm
        JOIN core.modulos m 
            ON m.id_mod = rm.id_mod
        WHERE rm.id_rol = $1`,
        [id]
      );

      return result.rows.map((r : any) => r.nombre);
    }


  async createRole(role: Role): Promise<Role> {
  const result = await this.pool.query(
    `INSERT INTO core.roles 
     (nombre, descripcion)
     VALUES ($1, $2)
     RETURNING *`,
    [
      role.nombre,
      role.descripcion
    ]
  );

  const row = result.rows[0];

  return new Role(
    row.id_rol,
    row.nombre,
    row.descripcion
  );
}

  async updateRole(role: Role): Promise<Role> {
    const result = await this.pool.query(
      `UPDATE core.roles SET nombre=$2, descripcion=$3
       WHERE id_rol=$1 RETURNING *`,
      [
        role.id,
        role.nombre,
        role.descripcion
      ]
    );

    const row = result.rows[0];
    return new Role(
      row.id_rol,
      row.nombre,
      row.descripcion
    );
  }
  
  
  async listRole(): Promise<Role[]> {

    const result = await this.pool.query(
      `SELECT id_rol, nombre, descripcion FROM core.roles`
    );

    return result.rows.map(row => 
      new Role(
        row.id_rol,
        row.nombre,
        row.descripcion
      )
    );
  }
}
