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

