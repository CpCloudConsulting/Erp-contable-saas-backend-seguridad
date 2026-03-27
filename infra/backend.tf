terraform {
  backend "s3" {
    bucket = "erp-terraform-contable-state"
    key    = "security/terraform.tfstate"
    region = "us-east-1"
  }
}