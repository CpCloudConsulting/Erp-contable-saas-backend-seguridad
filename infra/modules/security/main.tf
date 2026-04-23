data "aws_security_group" "lambda" {
  name   = "lambda-sg"
  vpc_id = var.vpc_id
}

resource "aws_security_group" "vpc_endpoint" {
  name        = "cognito-endpoint-sg"
  description = "Allow Lambda to connect to Cognito VPC Endpoint"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow Lambda to access Cognito"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [data.aws_security_group.lambda.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}