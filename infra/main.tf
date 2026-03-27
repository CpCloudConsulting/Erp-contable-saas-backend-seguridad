module "vpc" {
  source              = "./modules/vpc"
  
  name                = "erp-vpc"
  cidr                = "10.0.0.0/16"

  public_subnet_cidr_1  = "10.0.1.0/24"
  public_subnet_cidr_2  = "10.0.2.0/24"
  private_subnet_cidr_1 = "10.0.3.0/24"
  private_subnet_cidr_2 = "10.0.4.0/24"
}

module "security" {
  source = "./modules/security"
  vpc_id = module.vpc.vpc_id
}

data "aws_db_instance" "existing" {
  db_instance_identifier = "erp-db"
}

module "lambda" {
  source                = "./modules/lambda"
  name                  = "erp-security-service"
  handler               = "dist/handler.handler"
  filename              = "../dist.zip"
  subnet_ids            = module.vpc.private_subnet_ids
  security_group_ids    = [module.security.lambda_sg_id]
  environment_variables = {
    DB_HOST = data.aws_db_instance.existing.address
    DB_USER = var.db_user
    DB_PASS = var.db_password
    DB_NAME = var.db_name
  }
  vpc_id = module.vpc.vpc_id
  role_arn = module.iam.lambda_role_arn
  runtime = "nodejs20.x"
  lambda_source_dir = "${path.root}/../Security/dist"
}

module "api" {
  source             = "./modules/apigateway"
  name               = "erp-security-api"
  lambda_invoke_arn  = module.lambda.invoke_arn
  lambda_name       = module.lambda.function_name
}

module "iam" {
  source = "./modules/iam"
  project_name = "security"
}