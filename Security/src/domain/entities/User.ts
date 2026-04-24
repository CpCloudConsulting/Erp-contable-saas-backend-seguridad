export class User {
  constructor(
    public id_user: number,
    public cognito_sub: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public id_rol: number,
    public id_empresa: number,
    public password_hash: string,
    public username: string,
    public is_active: boolean
  ) {}
}