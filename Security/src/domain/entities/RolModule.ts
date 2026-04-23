export class RoleModule {
  constructor(
    public idRol: number,
    public idEmp: number,
  ) {}
}

export class RoleModuleAsign {
  constructor(
    public id_rol: number,
    public id_mod: number,
    public view: boolean,
    public make: boolean,
    public edit: boolean,
  ) {}
}