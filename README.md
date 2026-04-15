# Bitácora de Eventos - Proyecto DevOps

## Descripción
Aplicación web completa para registrar y gestionar eventos con categorías, fechas y descripciones. Incluye frontend HTML/JavaScript, backend Node.js/Express, base de datos MongoDB, y despliegue con Docker y AWS CloudFormation.

## Arquitectura
```
Usuario -> EC2 -> Docker
                  |-- Frontend (HTML + nginx)
                  |-- Backend (Node.js + Express)
                  |-- Base de Datos (MongoDB)
```

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript, nginx
- **Backend**: Node.js, Express.js, MongoDB
- **Base de Datos**: MongoDB 6.0
- **Contenerización**: Docker, Docker Compose
- **Despliegue**: AWS EC2, CloudFormation
- **Control de Versiones**: Git, GitHub
- **Automatización**: Scripts Bash, cron

## Instrucciones de Ejecución Local

### Requisitos Previos
- Docker y Docker Compose instalados
- Git

### Pasos de Ejecución
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AaronND7/AvanceDelProyecto-DevOps.git
   cd AvanceDelProyecto-DevOps
   ```

2. **Levantar los contenedores:**
   ```bash
   docker-compose up -d
   ```

3. **Acceder a la aplicación:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/events

### Scripts de Automatización
```bash
# Desplegar aplicación
./deploy.sh

# Iniciar aplicación
./start_app.sh

# Detener aplicación
./stop_app.sh
```

## Instrucciones de Despliegue en EC2

### Configuración de la Instancia EC2
1. **Crear instancia EC2** (t3.medium recomendado)
2. **Configurar Security Group** para permitir puertos:
   - 22 (SSH)
   - 3000 (Frontend)
   - 5000 (Backend API)

### Pasos de Despliegue
1. **Conectarse a la instancia:**
   ```bash
   ssh -i "clave.pem" ec2-user@<ip-publica>
   ```

2. **Instalar dependencias:**
   ```bash
   sudo yum update -y
   sudo yum install -y docker git
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   ```

3. **Clonar y desplegar:**
   ```bash
   git clone https://github.com/AaronND7/AvanceDelProyecto-DevOps.git
   cd AvanceDelProyecto-DevOps
   ./deploy.sh
   ```

4. **Acceder a la aplicación:**
   - URL: http://<ip-publica-ec2>:3000

## Puertos Utilizados
- **3000**: Frontend (nginx)
- **5000**: Backend API
- **27017**: MongoDB
- **22**: SSH

## Estructura del Proyecto
```
project/
|-- backend/                 # Backend Node.js
|   |-- src/
|   |   |-- app.js          # Aplicación principal
|   |-- package.json
|   |-- Dockerfile
|
|-- frontend/                # Frontend HTML
|   |-- index.html         # Aplicación web
|   |-- nginx.conf          # Configuración nginx
|   |-- Dockerfile
|
|-- cloudformation/
|   |-- template.yaml      # Plantilla CloudFormation
|
|-- docker-compose.yml      # Configuración Docker Compose
|-- deploy.sh              # Script de despliegue
|-- start_app.sh           # Script de inicio
|-- stop_app.sh            # Script de detención
|-- README.md              # Este archivo
```

## Endpoints de la API
- `GET /api/events` - Obtener todos los eventos
- `POST /api/events` - Crear nuevo evento
- `GET /api/stats` - Obtener estadísticas

## Logs y Monitoreo
- **Logs del backend**: `/backend/logs/app.log`
- **Logs de contenedores**: `docker-compose logs <servicio>`

## Security Groups - AWS CloudFormation
```yaml
# Configuración recomendada para Security Groups
WebSecurityGroup:
  Type: AWS::EC2::SecurityGroup
  Properties:
    GroupDescription: "Security group for web application"
    SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: 22
        ToPort: 22
        CidrIp: 0.0.0.0/0  # SSH (restringir en producción)
      - IpProtocol: tcp
        FromPort: 3000
        ToPort: 3000
        CidrIp: 0.0.0.0/0  # Frontend
      - IpProtocol: tcp
        FromPort: 5000
        ToPort: 5000
        CidrIp: 0.0.0.0/0  # Backend API
```

## Notas Importantes
- **No usar 0.0.0.0/0 en producción** - Restringir a IPs específicas
- **Usar HTTPS** en producción con certificados SSL
- **Rotar claves SSH** regularmente
- **Monitorear logs** de actividad sospechosa

## Automatización con cron
```bash
# Programar inicio diario a las 8:00 AM
0 8 * * * /home/ec2-user/AvanceDelProyecto-DevOps/start_app.sh

# Programar apagado diario a las 10:00 PM
0 22 * * * /home/ec2-user/AvanceDelProyecto-DevOps/stop_app.sh
```

## Contribuciones
1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/mejora`)
3. Commits significativos (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abrir Pull Request

## Licencia
Este proyecto es parte del curso de Fundamentos de DevOps - AWS Academy.

## Autor
- **Aaron Navarro Díaz** - Desarrollo completo del proyecto

---

## Estado del Proyecto: COMPLETO
- Aplicación funcional
- Docker contenerizado
- Desplegado en AWS EC2
- Logs generados
- Scripts de automatización
- CloudFormation template
- Documentación completa
