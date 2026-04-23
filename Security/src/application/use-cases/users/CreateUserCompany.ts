import { User } from "../../../domain/entities/User";
import { LambdaInvokerPort } from "../../../domain/repositories/LambdaInvokerPort";
import { UserRepository } from "../../../infrastructure/persistence/UserRepository";
import { CreateCognitoUserRequest, CreateCognitoUserResponse } from "../../dto/cognito";

export class CreateUserCompany {
  constructor(
    private repo: UserRepository, 
    private lambdaInvoker : LambdaInvokerPort) {}

  async execute(data: User) {
    try {
      console.log("Creating user with data:", data);
      const payload: CreateCognitoUserRequest = {
        action: "createUser",
        email: data.email,
        password: data.password_hash
      };
      
      const response = await this.lambdaInvoker.invoke<
        CreateCognitoUserRequest,
        CreateCognitoUserResponse
      >(
        process.env.AUTH_LAMBDA_NAME!,
        payload
      );

      console.log("Response LAMBDA A:", response);

      const body = typeof response.body === "string"? JSON.parse(response.body): response.body;
      
      if (!body?.cognito_sub) {
        throw new Error("No vino cognito_sub desde Lambda B");
      }

      data.cognito_sub = body.cognito_sub;
      return this.repo.createUser(data);
    } catch (error){
        throw error;
    }
    
  }
}