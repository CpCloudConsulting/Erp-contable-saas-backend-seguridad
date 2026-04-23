export interface LambdaInvokerPort {
  invoke<TRequest, TResponse>(
    functionName: string,
    payload: TRequest
  ): Promise<TResponse>;
}