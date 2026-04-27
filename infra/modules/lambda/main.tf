resource "aws_lambda_function" "this" {
    function_name = var.name
    runtime       = var.runtime
    handler       = var.handler
    filename      = data.archive_file.lambda_zip.output_path
    role = var.role_arn
    source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)
    
    environment {
      variables = var.environment_variables
    }

    timeout = 15

    vpc_config {
      subnet_ids         = var.subnet_ids
      security_group_ids = var.security_group_ids
    }
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_source_dir
  output_path = "${path.module}/dist.zip"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"
}

