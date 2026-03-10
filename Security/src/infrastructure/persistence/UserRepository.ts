import { Pool } from "pg";
import { UserRepositoryPort } from "../../domain/repositories/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class UserRepository implements UserRepositoryPort {

  constructor(private pool: Pool) {}

  async userByCompany(id: number): Promise<User | null> {
    const result = await this.pool.query(
      `SELECT * FROM core.usuarios WHERE id_empresa=$1`,
      [id]
    );
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new User(
      row.cognito_sub,
      row.nombre,
      row.apellido,
      row.email,
      row.id_rol,
      row.id_empresa,
      row.is_active
    );
  }

  async createUser(user: User): Promise<User> {
  const result = await this.pool.query(
    `INSERT INTO core.usuarios 
     (cognito_sub, nombre, apellido, email, id_rol, id_empresa, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      user.cognito_sub,
      user.nombre,
      user.apellido,
      user.email,
      user.id_rol,
      user.id_empresa,
      user.is_active
    ]
  );

  const row = result.rows[0];

  return new User(
    row.cognito_sub,
    row.nombre,
    row.apellido,
    row.email,
    row.id_rol,
    row.id_empresa,
    row.is_active,
  );
}

  async updateUser(user: User): Promise<User> {
    const result = await this.pool.query(
      `UPDATE core.usuarios SET nombre=$2, apellido=$3, email=$4
       WHERE id_user=$1 RETURNING *`,
      [
        user.cognito_sub,
        user.nombre,
        user.apellido,
        user.email,
        user.id_rol,
        user.id_empresa,
        user.is_active,
      ]
    );

    const row = result.rows[0];
    return new User(
      row.cognito_sub,
      row.nombre,
      row.apellido,
      row.email,
      row.id_rol,
      row.id_empresa,
      row.is_active
    );
  }

  async getByCognitoId(id: string): Promise<User | null> {
    const result = await this.pool.query(
      `SELECT * FROM core.usuarios WHERE cognito_sub=$1`,
      [id]
    );
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new User(
      row.cognito_sub,
      row.nombre,
      row.apellido,
      row.email,
      row.id_rol,
      row.id_empresa,
      row.is_active
    );
  }

}