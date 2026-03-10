module "vpc" {
  source              = "./modules/vpc"
  name                = "erp-vpc"
  cidr                = "10.0.0.0/16"
  public_subnet_cidr  = "10.0.1.0/24"
  private_subnet_cidr = "10.0.2.0/24"
}

module "security" {
  source = "./modules/security"
  vpc_id = module.vpc.vpc_id
}

module "rds" {
  source            = "./modules/rds"
  identifier        = "erp-db"
  instance_class    = "db.t3.micro"
  username          = var.db_user
  password          = var.db_password
  db_name           = var.db_name
  private_subnet_id = module.vpc.private_subnet_id
  security_group_id = module.security.rds_sg_id
}

module "lambda" {
  source                = "./modules/lambda"
  name                  = "contabilidad-service"
  handler               = "dist/handler.handler"
  filename              = "../dist.zip"
  private_subnet_id     = module.vpc.private_subnet_id
  security_group_id     = module.security.lambda_sg_id
  environment_variables = {
    DB_HOST = module.rds.db_host
    DB_USER = var.db_user
    DB_PASS = var.db_password
    DB_NAME = var.db_name
  }
}

module "api" {
  source             = "./modules/apigateway"
  name               = "erp-contabilidad-api"
  lambda_invoke_arn  = module.lambda.invoke_arn
  vpc_id            = module.vpc.vpc_id
}