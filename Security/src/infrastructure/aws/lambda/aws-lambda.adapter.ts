import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { LambdaInvokerPort } from "../../../domain/repositories/LambdaInvokerPort";

export class AwsLambdaAdapter implements LambdaInvokerPort {
  private client: LambdaClient;

  constructor() {
    this.client = new LambdaClient({
      region: "us-east-1"
    });
  }

  async invoke<TRequest, TResponse>(
    functionName: string,
    payload: TRequest
  ): Promise<TResponse> {
    const command = new InvokeCommand({
      FunctionName: functionName,
      InvocationType: "RequestResponse",
      Payload: Buffer.from(JSON.stringify(payload))
    });

    const response = await this.client.send(command);

    const result = JSON.parse(
      new TextDecoder().decode(response.Payload)
    );

    return result;
  }
}