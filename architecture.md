# Diagrama de Arquitectura - Bitácora de Eventos

## Diagrama ASCII

```
                    INTERNET
                        |
                        v
    +------------------- AWS Cloud -------------------+
    |                                               |
    |  +-------------+     +---------------------+  |
    |  |     S3       |     |     EC2 Instance   |  |
    |  |   Bucket     |<--->|    (Amazon Linux)  |  |
    |  |             |     |                     |  |
    |  | - Logs      |     | +-----------------+ |  |
    |  | - Backups   |     | |   Docker        | |  |
    |  | - Static    |     | |   Engine        | |  |
    |  +-------------+     | +-----------------+ |  |
    |                      |         |           |  |
    |                      |         v           |  |
    |                      | +-----------------+ |  |
    |                      | | Docker Compose  | |  |
    |                      | +-----------------+ |  |
    |                      |         |           |  |
    |                      |         v           |  |
    |                      | +-----------------+ |  |
    |                      | |   Frontend      | |  |
    |                      | |   React App     | |  |
    |                      | |   (Port 3000)   | |  |
    |                      | +-----------------+ |  |
    |                      |         |           |  |
    |                      |         v           |  |
    |                      | +-----------------+ |  |
    |                      | |   Backend       | |  |
    |                      | |   Node.js API   | |  |
    |                      | |   (Port 5000)   | |  |
    |                      | +-----------------+ |  |
    |                      |         |           |  |
    |                      |         v           |  |
    |                      | +-----------------+ |  |
    |                      | |   MongoDB       | |  |
    |                      | |   Database      | |  |
    |                      | |   (Port 27017)  | |  |
    |                      | +-----------------+ |  |
    |                      +---------------------+  |
    |                                               |
    +-----------------------------------------------+
```

## Descripción de Componentes

### 1. Usuario Final
- Accede a través de navegador web
- Interactúa con la interfaz React

### 2. AWS Cloud Infrastructure
- **EC2 Instance**: Servidor principal que ejecuta toda la aplicación
- **S3 Bucket**: Almacenamiento para logs, backups y archivos estáticos
- **Security Groups**: Reglas de firewall para controlar el acceso

### 3. Docker Containerization
- **Docker Engine**: Runtime para contenedores
- **Docker Compose**: Orquestación de múltiples servicios

### 4. Application Stack
- **Frontend**: React + TailwindCSS (Puerto 3000)
  - Interfaz de usuario responsiva
  - Consumo de API REST
  - Gestión de estado local

- **Backend**: Node.js + Express (Puerto 5000)
  - API RESTful
  - Conexión a MongoDB
  - Sistema de logging con Winston
  - Middleware de seguridad

- **Database**: MongoDB (Puerto 27017)
  - Almacenamiento de eventos
  - Datos de ejemplo pre-cargados
  - Persistencia de datos

### 5. Flujo de Datos
1. Usuario interactúa con frontend React
2. Frontend hace peticiones HTTP al backend
3. Backend procesa solicitudes y consulta MongoDB
4. Backend genera logs en archivo local
5. Logs pueden sincronizarse con S3
6. Respuesta vuelve al frontend y se muestra al usuario

### 6. Seguridad
- Security Groups con puertos específicos
- IAM Roles para acceso a S3
- Rate limiting en API
- Validación de datos
- Logs de auditoría

### 7. Escalabilidad
- Contenedores Docker para fácil replicación
- S3 para almacenamiento escalable
- EC2 puede escalar verticalmente
- Separación clara de componentes

## Tecnologías Utilizadas

### Frontend
- React 18
- TailwindCSS
- Axios para HTTP
- date-fns para fechas

### Backend
- Node.js 18
- Express.js
- MongoDB + Mongoose
- Winston (logging)
- Helmet (seguridad)
- Rate limiting

### DevOps
- Docker & Docker Compose
- AWS CloudFormation
- AWS EC2
- AWS S3
- Bash Scripts
- Git/GitHub

### Monitoreo y Logs
- Winston logging
- Docker logs
- S3 para persistencia de logs
- Health checks

## Puertos Utilizados
- **3000**: Frontend React
- **5000**: Backend API
- **27017**: MongoDB (interno)
- **80**: HTTP (redirigido a 3000)
- **443**: HTTPS (futuro SSL)
- **22**: SSH (administración)
