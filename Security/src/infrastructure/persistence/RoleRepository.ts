import { Pool } from "pg";
import { Role, ListRole } from "../../domain/entities/Role";
import { RoleRepositoryPort } from "../../domain/repositories/RoleRepositoryPort";
import { RoleModule, RoleModuleAsign} from "../../domain/entities/RolModule";

export class RoleRepository implements RoleRepositoryPort {

  constructor(private pool: Pool) {}


  async asignRole(id: number, modules: ModulePermission[]): Promise<ResponseAsignRole[]> {

  const query = `
    INSERT INTO rol_modulos (id_rol, id_mod, view, make, edit)
    SELECT 
      $1,
      m.id_mod,
      m.view,
      m.make,
      m.edit
    FROM jsonb_to_recordset($2::jsonb) AS m(
      id_mod INT,
      view BOOLEAN,
      make BOOLEAN,
      edit BOOLEAN
    )
    ON CONFLICT (id_rol, id_mod)
    DO UPDATE SET
      view = EXCLUDED.view,
      make = EXCLUDED.make,
      edit = EXCLUDED.edit
    RETURNING id_rol, id_mod, view, make, edit;
  `;

  const result = await this.pool.query(query, [
    id,
    JSON.stringify(modules)
  ]);

  return result.rows.map(
    row => new RoleModuleAsign(
      row.id_rol,
      row.id_mod,
      row.view,
      row.make,
      row.edit
    )
  );
}

  async listModuleByRole(data: RoleModule): Promise<ModulePermission[]> {

      const result = await this.pool.query(
        `SELECT DISTINCT
              m.id_mod,
              m.nombre,
              rm.view,
              rm.edit,
              rm.make
          FROM core.modulos m
          JOIN core.plan_modulos pm ON pm.id_mod = m.id_mod
          JOIN core.suscripciones s ON s.id_plan = pm.id_plan
          JOIN rol_modulos rm ON rm.id_mod = m.id_mod
          WHERE rm.id_rol = $1
            AND s.id_empresa = $2
            AND s.estado = 'ACTIVA'
            AND m.is_active = TRUE;`,
        [data.idRol, data.idEmp]
      );

      return result.rows as ModulePermission[];
    }


  async createRole(role: Role): Promise<Role> {
  const result = await this.pool.query(
    `INSERT INTO roles 
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
      `UPDATE roles SET nombre=$2, descripcion=$3
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
  
  
  async listRole(id:number): Promise<ListRole[]> {

    const result = await this.pool.query(
      `SELECT 
        r.id_rol,
        r.nombre,
        r.descripcion,
        COUNT(u.id_user) AS users_count
      FROM roles r
      LEFT JOIN core.usuarios u 
        ON u.id_rol = r.id_rol
        AND u.is_active = TRUE
        AND u.id_empresa = $1
      GROUP BY r.id_rol, r.nombre, r.descripcion;`, [id]
    );

    return result.rows.map(row => 
      new ListRole(
        row.id_rol,
        row.nombre,
        row.descripcion,
        row.users_count
      )
    );
  }

}
