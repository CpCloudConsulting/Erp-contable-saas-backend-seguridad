
# ERP Contable SaaS - Backend Seguridad

Este proyecto es el módulo de seguridad del backend para una aplicación SaaS de ERP Contable. Proporciona funcionalidades para la gestión de usuarios, roles, módulos y permisos en un entorno multi-tenant.

## ¿Qué hace este código fuente?

El código fuente implementa un servicio backend de seguridad que permite:

- **Gestión de Usuarios**: Crear, actualizar y buscar usuarios por empresa o por ID de Cognito.
- **Gestión de Roles**: Crear, listar, actualizar y asignar roles a usuarios.
- **Gestión de Módulos**: Crear, listar y actualizar módulos del sistema.
- **Asignación de Módulos a Roles**: Vincular módulos con roles para definir permisos.
- **Autenticación y Autorización**: Integración con AWS Cognito para autenticación y manejo de esquemas multi-tenant.

El servicio está diseñado para ser desplegado como una función AWS Lambda detrás de API Gateway, utilizando una base de datos PostgreSQL con esquemas separados por tenant.

## Arquitectura

El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia), que promueve la separación de responsabilidades y facilita el mantenimiento y las pruebas. La estructura se divide en las siguientes capas:

### 1. **Domain (Dominio)**
   - **Entities**: Representan los objetos de negocio principales (Role, User, Module, etc.).
   - **Repositories Ports**: Interfaces que definen los contratos para el acceso a datos, sin depender de implementaciones específicas.

### 2. **Application (Aplicación)**
   - **Use Cases**: Contienen la lógica de negocio pura. Cada caso de uso representa una operación específica (CreateRole, ListModule, etc.).
   - **DTOs**: Objetos de transferencia de datos para comunicar entre capas.

### 3. **Infrastructure (Infraestructura)**
   - **Controllers**: Manejan las solicitudes HTTP entrantes y delegan a los casos de uso.
   - **Persistence**: Implementaciones concretas de los repositorios (usando PostgreSQL).
   - **AWS Adapters**: Adaptadores para servicios de AWS como Lambda y Cognito.
   - **DB Pool**: Configuración de conexión a la base de datos con soporte para multi-tenancy.

### 4. **Shared**
   - Tipos comunes y utilidades compartidas.

### Infraestructura como Código
- **Terraform**: Define la infraestructura en AWS (VPC, API Gateway, Lambda, IAM, etc.) en la carpeta `infra/`.
- **Docker**: Para desarrollo local y empaquetado.

## Tecnologías Utilizadas

- **Lenguaje**: TypeScript
- **Runtime**: Node.js (target node20)
- **Framework**: AWS Lambda con API Gateway
- **Base de Datos**: PostgreSQL con multi-tenancy por esquema
- **Autenticación**: AWS Cognito
- **Despliegue**: Terraform, Docker, AWS ECR
- **CI/CD**: GitHub Actions

## Instalación y Configuración

### Prerrequisitos
- Node.js 20+
- Docker
- AWS CLI configurado
- Terraform

### Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   cd Erp-contable-saas-backend-seguridad
   ```

2. Instala dependencias:
   ```bash
   cd Security
   npm install
   ```

3. Configura variables de entorno (crea un archivo `.env`):
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db
   ```

4. Construye el proyecto:
   ```bash
   npm run build
   ```

5. Ejecuta localmente (requiere aws-lambda-ric):
   ```bash
   npm start
   ```

### Despliegue

1. Configura secretos en GitHub Actions:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_ACCOUNT_ID`

2. Actualiza `infra/terraform.tfvars` con tus valores.

3. Ejecuta el script de despliegue:
   ```bash
   .\deploy.ps1
   ```

El despliegue automático ocurre al hacer push a la rama main.

## API Endpoints

- `GET /security/roles/{id}`: Listar roles por ID
- `POST /security/roles`: Crear rol
- `PUT /security/roles`: Actualizar rol
- `POST /security/roles/{id}/asign`: Asignar módulos a rol
- `GET /security/roles/{idrol}/modules/{idempresa}`: Módulos por rol
- `POST /security/module`: Crear módulo
- `PUT /security/module`: Actualizar módulo
- `GET /security/module`: Listar módulos
- `POST /security/user`: Crear usuario
- `PUT /security/user`: Actualizar usuario
- `GET /security/empresa/{id}/user`: Usuarios por empresa
- `GET /security/user/{id}/cognito`: Usuario por Cognito ID

## Características Adicionales

- **Multi-Tenancy**: Soporte para múltiples tenants usando esquemas de base de datos separados.
- **CORS**: Configurado para permitir solicitudes desde orígenes cruzados.
- **Dockerizado**: Fácil empaquetado y despliegue con Docker.
- **Infraestructura como Código**: Toda la infraestructura definida en Terraform para reproducibilidad.

## Contribución

1. Crea una rama para tu feature.
2. Implementa siguiendo la arquitectura Clean Architecture.
3. Asegúrate de que las pruebas pasen.
4. Crea un Pull Request.

## Licencia

[Especifica la licencia si aplica]
