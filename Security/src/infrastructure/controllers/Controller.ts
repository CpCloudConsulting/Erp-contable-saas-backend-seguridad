import { Container } from "../../container/Container";
import { CustomAPIGatewayEvent } from "../../shared/types";

type RouteHandler = (event: CustomAPIGatewayEvent) => Promise<any>;

export class Controller {

  private routes: Record<string, RouteHandler>;

  constructor() {
    this.routes = {
      "GET:/roles": this.listRole,
      "POST:/roles": this.createRole,
      "PUT:/roles": this.updateRole,
      "POST:/roles/{id}/asign": this.asignRole,
      "GET:/roles/{id}/modules": this.moduleByRole,
    };
  }


  async handle(event: CustomAPIGatewayEvent) {
    const method = event.requestContext.http.method;
    const path = event.rawPath;

    const routeKey = `${method}:${path}`;
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
    const container = new Container();
    const roles = await container.listRole.execute();
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

  private async asignRole(event: CustomAPIGatewayEvent) {
    const id = event.pathParameters?.id;
    if (!id) {
      return this.badRequest("ID is required");
    }
    const body = JSON.parse(event.body || "{}");
    const container = new Container();
    const role = await container.asignRole.execute(id, body);
    return this.ok(role);
  }

  private async moduleByRole(event: CustomAPIGatewayEvent) {
    const id = event.pathParameters?.id;
    const container = new Container();
    const modules = await container.moduleByRole.execute(id);
    return this.ok(modules);
  }

  
  private ok(data: any) {
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  private badRequest(message: string) {
    return { statusCode: 400, body: JSON.stringify({ error: message }) };
  }

  private notFound() {
    return { statusCode: 404, body: JSON.stringify({ error: "Ruta no encontrada" }) };
  }
}