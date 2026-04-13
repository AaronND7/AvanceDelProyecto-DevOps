# Bitácora de Eventos - Proyecto DevOps

## Descripción
Aplicación web para registrar y gestionar eventos con categorías, fechas y descripciones. Incluye frontend React, backend Node.js/Express, base de datos MongoDB, y despliegue con Docker y AWS CloudFormation.

## Arquitectura
- Frontend: React + TailwindCSS (puerto 3000)
- Backend: Node.js + Express (puerto 5000)
- Base de datos: MongoDB (puerto 27017)
- Contenerización: Docker + Docker Compose
- Despliegue: AWS EC2 + CloudFormation

## Tecnologías
- React, Node.js, Express, MongoDB
- Docker, Docker Compose
- AWS (EC2, S3, CloudFormation)
- Git, Bash

## Estructura del Proyecto
```
project/
|
|-- backend/
|   |-- src/
|   |-- package.json
|   |-- Dockerfile
|
|-- frontend/
|   |-- src/
|   |-- package.json
|   |-- Dockerfile
|
|-- cloudformation/
|   |-- template.yaml
|
|-- docker-compose.yml
|-- deploy.sh
|-- start_app.sh
|-- stop_app.sh
|-- README.md
```

## Instrucciones de Ejecución Local
1. Clonar el repositorio
2. Ejecutar `./deploy.sh`
3. Acceder a http://localhost:3000

## Instrucciones de Despliegue en EC2
1. Crear instancia EC2 con CloudFormation
2. Instalar Git, Docker, Docker Compose
3. Clonar repositorio y ejecutar `./deploy.sh`
4. Acceder a http://<ip-publica-ec2>:3000

## Puertos Utilizados
- 3000: Frontend React
- 5000: Backend API
- 27017: MongoDB

## Logs
Los logs se generan en `/app/logs/app.log` con formato:
```
[YYYY-MM-DD HH:MM:SS] LEVEL: Mensaje
```
