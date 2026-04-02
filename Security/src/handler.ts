import { CustomAPIGatewayEvent } from "./shared/types";
import { setTenantSchema } from "./infrastructure/db/pool";
import { Controller } from "./infrastructure/controllers/Controller";

const controller = new Controller();

export const handler = async (event: CustomAPIGatewayEvent) => {
  try {
    const schema = event.headers["x-schema"] || event.requestContext.authorizer?.schema as string;

    if (!schema) {
      return response(401, "Schema no definido en token");
    }
    await setTenantSchema(schema);

    return await controller.handle(event);

  } catch (error: any) {
    return response(500, error.message);
  }
};

function response(status: number, body: any) {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
}