import { Container } from "../../container/Container";
import { CustomAPIGatewayEvent } from "../../shared/types";

type RouteHandler = (event: CustomAPIGatewayEvent) => Promise<any>;

export class Controller {

  private routes: Record<string, RouteHandler>;

  constructor() {
    this.routes = {
      "POST:/empresas": this.createCompany,
      "GET:/empresas": this.companyList,
      "GET:/empresas/{id}": this.findCompany,
      "PATCH:/empresas/{id}/status": this.updateCompanyStatus,
      "PUT:/empresas": this.updateCompany,
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

  private async createCompany(event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    return this.ok(await new Container().createCompany.execute(body));
  }

  private async companyList() {
    return this.ok(await new Container().listCompanies.execute());
  }

  private async findCompany(event: CustomAPIGatewayEvent) {
    const id = event.pathParameters?.id;
    return this.ok(await new Container().findCompany.execute(id));
  }

  private async updateCompanyStatus(event: CustomAPIGatewayEvent) {
    const id = Number(event.pathParameters?.id);
    return this.ok(await new Container().updateCompanyStatus.execute(id));
  }

  public async updateCompany(event: CustomAPIGatewayEvent) {
    const body = JSON.parse(event.body || "{}");
    return this.ok(await new Container().updateCompany.execute(body));
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