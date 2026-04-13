resource "aws_apigatewayv2_api" "this" {
  name          = var.name
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization","x-schema"]
    expose_headers = ["*"]
    max_age = 3600
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_roles" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /security/roles"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_roles" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /security/roles"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "put_roles" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "PUT /security/roles"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_roles_asign" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /security/roles/{id}/asign"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "get_role_module" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /security/roles/{id}/modules"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_user" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /security/user"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "put_user" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "PUT /security/user"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "get_empresa_user" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /security/empresa/{id}/user"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "get_user_cognito" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /security/user/{id}/cognito"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "get_module" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /security/module"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_module" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /security/module"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "put_module" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "PUT /security/module"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_name
  principal     = "apigateway.amazonaws.com"
}