interface ModulePermission {
  id_mod: number;
  nombre: string;
  view: boolean;
  edit: boolean;
  make: boolean;
}

interface ModuleSubscription {
  id_mod: number;
  nombre: string;
}

interface ResponseAsignRole {
  id_rol: number;
  id_mod: number;
  view: boolean;
  make: boolean;
  edit: boolean;
}