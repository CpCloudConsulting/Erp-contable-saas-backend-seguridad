export interface CreateCognitoUserRequest {
  action: string,
  email: string;
  password: string;
}

export interface CreateCognitoUserResponse {
  body: {
    cognito_sub: string;
  }
}