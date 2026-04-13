import { CustomAPIGatewayEvent } from "./shared/types";
import { setTenantSchema } from "./infrastructure/db/pool";
import { Controller } from "./infrastructure/controllers/Controller";

const controller = new Controller();

export const handler = async (event: CustomAPIGatewayEvent) => {
  try {
    const method = event.requestContext?.http?.method || event.httpMethod;

    if (method === "OPTIONS") {
      return response(200, "");
    }
    const schema = event.headers["x-schema"] || event.requestContext.authorizer?.schema as string;

    if (!schema) {
      return response(401, "Schema no definido en token");
    }
    await setTenantSchema(schema);

    const result = await controller.handle(event);
    return response(result.statusCode, result.body);

  } catch (error: any) {
    return response(500, error.message);
  }
};

function response(status: number, body: any) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-schema",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,PATCH,DELETE"
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    isBase64Encoded: false
  };
}