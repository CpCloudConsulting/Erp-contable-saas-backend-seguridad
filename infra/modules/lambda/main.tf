resource "aws_lambda_function" "this" {
    function_name = var.name
    runtime       = var.runtime
    handler       = var.handler
    filename      = data.archive_file.lambda_zip.output_path
    role = var.role_arn
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_source_dir
  output_path = "${path.module}/dist.zip"
}