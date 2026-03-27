variable "vpc_id" {
    description = "VPC donde se desplegará la lambda"
}

variable "name" {
  description = "Nombre de la Lambda"
  type        = string
}

variable "handler" {
  type = string
}

variable "filename" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "security_group_ids" {
  type = list(string)
}

variable "environment_variables" {
  type = map(string)
}

variable "role_arn" {
  type = string
}

variable "runtime" {
  description = "Runtime de la Lambda"
  type        = string
}

variable "lambda_source_dir" {
  type = string
}