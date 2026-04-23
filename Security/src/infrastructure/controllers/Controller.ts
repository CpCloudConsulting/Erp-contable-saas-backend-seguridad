import { Container } from "../../container/Container";
import { CustomAPIGatewayEvent } from "../../shared/types";

type RouteHandler = (event: CustomAPIGatewayEvent) => Promise<any>;

export class Controller {

  private routes: Record<string, RouteHandler>;
  private Domain = "/security";

  constructor() {
    this.routes = {
      "GET /roles/{id}": this.listRole,
      "POST /roles": this.createRole,
      "PUT /roles": this.updateRole,
      "POST /roles/{id}/asign": this.asignRole,
      "GET /roles/{idRol}/modules/{idEmp}": this.moduleByRole,
      "POST /module": this.createModule,
      "PUT /module": this.updateModule,
      "GET /module": this.listModule,
      "POST /user": this.createUser,
      "PUT /user": this.updateUser,
      "GET /empresa/{id}/user": this.findUserByCompany,
      "GET /user/{id}/cognito": this.findUser,
    };
  }


  async handle(event: CustomAPIGatewayEvent) {
    let routeKey = event.routeKey;
    routeKey = routeKey.replace(this.Domain, "");
    
    const handler = this.routes[routeKey];

    if (!handler) {
      return this.notFound();
    }

    try {
      return await handler.call(this, event);
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  private async listRole(event: CustomAPIGatewayEvent) {
    const id = Number(event.pathParameters?.id);
    if (!id) {
      return this.badRequest("ID is required");
    }
    const container = new Container();
    const roles = await container.listRole.execute(id);
    return this.ok(roles);
  }

  private async createRole(event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const role = await container.createRole.execute(body);
    return this.ok(role);
  }

  private async updateRole(event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const role = await container.updateRole.execute(body);
    return this.ok(role);
  }

  private async createModule (event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const module = await container.createModule.execute(body);
    return this.ok(module);
  }

  private async updateModule (event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const module = await container.updateModule.execute(body);
    return this.ok(module);
  }

  private async listModule(event: CustomAPIGatewayEvent) {
    const container = new Container();
    const modules = await container.listModule.execute();
    return this.ok(modules);
  }

  private async asignRole(event: CustomAPIGatewayEvent) {
    const id = Number(event.pathParameters?.id);
    if (!id) {
      return this.badRequest("ID is required");
    }
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const role = await container.asignRole.execute(id, body.modules);
    return this.ok(role);
  }

  private async moduleByRole(event: CustomAPIGatewayEvent) {
    const idRol = Number(event.pathParameters?.idRol);
    const idEmp = Number(event.pathParameters?.idEmp);
    const data = { idRol, idEmp}
    const container = new Container();
    const modules = await container.moduleByRole.execute(data);
    return this.ok(modules);
  }

  private async createUser(event: CustomAPIGatewayEvent){
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const user = await container.createUser.execute(body);
    return this.ok(user);
  }

  private async updateUser(event: CustomAPIGatewayEvent){
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const user = await container.updateUser.execute(body);
    return this.ok(user);
  }

  private async findUserByCompany(event: CustomAPIGatewayEvent){
    const id = Number(event.pathParameters?.id);
    const container = new Container();
    const user = await container.findUserByCompany.execute(id);
    return this.ok(user);
  }

   private async findUser(event: CustomAPIGatewayEvent){
    const id = event.pathParameters?.id;
    if (!id) {
      return this.badRequest("ID is required");
    }
    const container = new Container();
    const user = await container.findUserByCognito.execute(id);
    return this.ok(user);
  }

  private ok(data: any) {
    return { statusCode: 200, body: data };
  }

  private badRequest(message: string) {
    return { statusCode: 400, body: { error: message } };
  }

  private notFound() {
    return { statusCode: 404, body: { error: "Ruta no encontrada" } };
  }
}