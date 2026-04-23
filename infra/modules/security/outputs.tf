output "lambda_sg_id" {
  value = data.aws_security_group.lambda.id
}

output "vpc_endpoint_sg_id" {
  value = aws_security_group.vpc_endpoint.id
}
