export class User {
  constructor(
    public id: number,
    public cognito_sub: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public id_rol: number,
    public id_empresa: number,
    public is_active: boolean
  ) {}
}