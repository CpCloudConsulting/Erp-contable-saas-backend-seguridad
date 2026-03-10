variable "vpc_id" {}
variable "name" {
  type = string
}
variable "lambda_invoke_arn" {
  description = "ARN de invocación de la Lambda"
  type        = string
}