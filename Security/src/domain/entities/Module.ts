
export class Module {
  constructor(
    public id: number,
    public nombre: string,
    public is_active: boolean
  ) {}
}

export class Subscription {
  constructor(
    public idEmp: number,
  ) {}
}

export class ModelSubscription {
  constructor(
    public id_mod: number,
    public nombre: string,
    public view: boolean,
    public edit: boolean,
    public make: boolean
  ) {}
}