import { Pool } from "pg";
import { Role } from "../../domain/entities/Role";
import { RoleRepositoryPort } from "../../domain/repositories/RoleRepositoryPort";

export class RoleRepository implements RoleRepositoryPort {

  constructor(private pool: Pool) {}


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
    row.nombre,
    row.descripcion
  );
}

  async updateRole(role: Role): Promise<Role> {
    const result = await this.pool.query(
      `UPDATE core.roles SET nombre=$2, descripcion=$3
       WHERE id_role=$1 RETURNING *`,
      [
        role.nombre,
        role.descripcion
      ]
    );

    const row = result.rows[0];
    return new Role(
      row.nombre,
      row.descripcion
    );
  }
  
  
  async listRole(): Promise<Role> {

    const result = await this.pool.query(
          `SELECT nombre, descripcion FROM core.roles`
        );

        const row = result.rows;
        return new Role (
          row.nombre,
          row.descripcion
        );
      }
}
