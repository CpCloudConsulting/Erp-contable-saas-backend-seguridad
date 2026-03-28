data "aws_security_group" "lambda" {
  filter {
    name   = "group-name"
    values = ["lambda-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [var.vpc_id]
  }
}