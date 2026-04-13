# Reporte del Proyecto - Bitácora de Eventos

## Introducción

### Descripción de la Aplicación
La Bitácora de Eventos es una aplicación web completa desarrollada como proyecto de Fundamentos de DevOps. Permite a los usuarios registrar, gestionar y consultar eventos importantes con categorías, fechas y descripciones. La aplicación simula un entorno real de desarrollo y operaciones, incorporando las mejores prácticas de DevOps.

### Justificación del Desarrollo
Este proyecto fue elegido porque:
- Cumple con el requisito de no ser un administrador de tareas
- Permite demostrar el ciclo completo de vida de una aplicación
- Incluye operaciones CRUD complejas con búsqueda y filtrado
- Genera logs significativos para auditoría
- Es escalable y puede extenderse fácilmente

## Desarrollo

### Tecnologías Utilizadas

#### Frontend
- **React 18**: Framework JavaScript moderno para interfaces de usuario
- **TailwindCSS**: Framework CSS para diseño responsivo y moderno
- **Axios**: Cliente HTTP para comunicación con el backend
- **date-fns**: Librería para manejo de fechas y formateo

#### Backend
- **Node.js 18**: Runtime JavaScript del lado del servidor
- **Express.js**: Framework web minimalista y robusto
- **MongoDB**: Base de datos NoSQL flexible y escalable
- **Mongoose**: ODM para MongoDB con validación de esquemas
- **Winston**: Sistema de logging estructurado y configurable
- **Helmet**: Middleware de seguridad para Express
- **Rate Limiting**: Protección contra ataques de fuerza bruta

#### DevOps y Cloud
- **Docker**: Contenerización de aplicaciones
- **Docker Compose**: Orquestación de múltiples servicios
- **AWS CloudFormation**: Infraestructura como código
- **AWS EC2**: Servidor en la nube
- **AWS S3**: Almacenamiento de objetos para logs y backups
- **Bash Scripts**: Automatización de despliegue
- **Git/GitHub**: Control de versiones

### Arquitectura

La aplicación sigue una arquitectura de microservicios contenerizada:

```
Usuario -> Navegador -> Frontend React -> Backend API -> MongoDB
                                 |
                                 v
                              Logs (Winston)
                                 |
                                 v
                              S3 Bucket
```

#### Componentes Principales
1. **Frontend**: Interfaz de usuario responsiva con React
2. **Backend**: API RESTful con Node.js y Express
3. **Base de Datos**: MongoDB para persistencia de eventos
4. **Logs**: Sistema de logging con Winston y almacenamiento en S3
5. **Contenerización**: Docker para reproducibilidad del entorno
6. **Infraestructura**: AWS CloudFormation para despliegue automatizado

## Implementación

### Pasos de Ejecución Local

1. **Prerrequisitos**
   ```bash
   # Instalar Docker y Docker Compose
   # Clonar repositorio
   git clone <repository-url>
   cd eventlog
   ```

2. **Despliegue Automático**
   ```bash
   # Ejecutar script de despliegue
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Acceso a la Aplicación**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

### Pasos en EC2

1. **Crear Infraestructura con CloudFormation**
   ```bash
   aws cloudformation create-stack \
     --stack-name eventlog-stack \
     --template-body file://cloudformation/template.yaml \
     --parameters ParameterKey=KeyName,ParameterValue=my-keypair \
     --capabilities CAPABILITY_IAM
   ```

2. **Acceso a la Instancia**
   ```bash
   # Obtener IP pública desde outputs del stack
   ssh -i my-keypair.pem ec2-user@<public-ip>
   ```

3. **Verificación**
   - La aplicación se despliega automáticamente via UserData
   - Acceso via http://<public-ip>

### Automatización con Cron

Para programar el encendido/apagado automático:

```bash
# Editar crontab
crontab -e

# Programar encendido (8:00 AM diario)
0 8 * * * /path/to/eventlog/start_app.sh

# Programar apagado (10:00 PM diario)
0 22 * * * /path/to/eventlog/stop_app.sh
```

## Evidencias

### Logs Generados

Ejemplo de logs del sistema:

```
[2026-04-13T10:00:00.000Z] INFO: Conectado a MongoDB
[2026-04-13T10:01:15.123Z] INFO: Consulta realizada: 3 eventos encontrados
[2026-04-13T10:02:30.456Z] INFO: Evento creado: Reunión de equipo
[2026-04-13T10:03:45.789Z] WARN: Intento de crear evento con datos incompletos
[2026-04-13T10:05:00.000Z] ERROR: Fallo en conexión a base de datos
[2026-04-13T10:06:15.111Z] INFO: Evento eliminado: Tarea anticuada
[2026-04-13T10:07:30.222Z] INFO: Estadísticas solicitadas
[2026-04-13T10:08:45.333Z] INFO: Health check realizado
```

### Funcionalidades Implementadas

1. **Gestión de Eventos**
   - Crear eventos con título, descripción, categoría y fecha
   - Listar todos los eventos ordenados por fecha
   - Eliminar eventos con confirmación
   - Buscar eventos por texto
   - Filtrar por categoría

2. **Estadísticas en Tiempo Real**
   - Total de eventos registrados
   - Conteo por categorías
   - Actualización automática

3. **Interfaz Responsiva**
   - Diseño moderno con TailwindCSS
   - Compatible con móviles y tablets
   - Formularios con validación
   - Notificaciones de estado

## Problemas Encontrados

### Retos Técnicos

1. **Configuración de Docker Compose**
   - **Problema**: Conexión entre contenedores
   - **Solución**: Configurar red Docker personalizada y nombres de servicio

2. **Variables de Entorno**
   - **Problema**: Diferentes configuraciones local/producción
   - **Solución**: Archivos .env separados y configuración dinámica

3. **Persistencia de Datos MongoDB**
   - **Problema**: Pérdida de datos al reiniciar contenedores
   - **Solución**: Volumes de Docker y script de inicialización

4. **Rate Limiting en Desarrollo**
   - **Problema**: Límites muy restrictivos para pruebas
   - **Solución**: Configuración diferenciada por entorno

5. **CloudFormation IAM Permissions**
   - **Problema**: Permisos insuficientes para EC2
   - **Solución**: IAM Role con políticas específicas

## Reflexión

### ¿Qué fue lo más difícil?
La configuración inicial de Docker Compose fue el mayor desafío. Coordinar tres servicios diferentes (frontend, backend, base de datos) con sus respectivas dependencias y redes requirió múltiples iteraciones y debugging.

### ¿Qué mejorarías?
1. **Testing Automatizado**: Implementar pruebas unitarias y de integración
2. **CI/CD Pipeline**: GitHub Actions para despliegue automático
3. **Monitoring**: Integración con Prometheus y Grafana
4. **SSL/TLS**: Configuración de HTTPS con Let's Encrypt
5. **Database Backups**: Automatización de backups en S3

### ¿Qué cambiarías en producción?
1. **Security Groups**: Restringir acceso SSH a IPs específicas
2. **Load Balancer**: Implementar AWS ALB para alta disponibilidad
3. **Database Managed**: Migrar a Amazon DocumentDB
4. **Secrets Manager**: Usar AWS Secrets Manager para credenciales
5. **Multi-AZ**: Despliegue en múltiples zonas de disponibilidad

## Preguntas de Reflexión

### ¿Por qué es importante Docker en DevOps?
Docker es fundamental en DevOps porque:
- **Consistencia**: Mismo entorno en desarrollo y producción
- **Reproducibilidad**: Elimina el problema "funciona en mi máquina"
- **Escalabilidad**: Facilita el escalado horizontal
- **Aislamiento**: Cada servicio en su propio contenedor
- **Portabilidad**: Aplicaciones independientes de la infraestructura

### ¿Qué ventajas ofrece CloudFormation?
CloudFormation proporciona:
- **Infraestructura como Código**: Versionado y reproducible
- **Automatización**: Creación automatizada de recursos
- **Gestión de Dependencias**: Orden correcto de creación
- **Rollbacks**: Reversión automática en caso de errores
- **Plantillas Reutilizables**: Múltiples entornos con misma configuración

### ¿Por qué no es recomendable usar 0.0.0.0/0 en producción?
Usar 0.0.0.0/0 (acceso desde cualquier IP) es riesgoso porque:
- **Seguridad**: Expone servicios a atacantes globales
- **Ataques**: Aumenta superficie de ataques posibles
- **Cumplimiento**: Violación de políticas de seguridad
- **Costos**: Puede generar tráfico malicioso costoso
- **Reputación**: Riesgo de ser usado para actividades maliciosas

**Mejores prácticas:**
- Restringir a IPs específicas conocidas
- Usar VPN para acceso administrativo
- Implementar firewalls y WAF
- Monitorear accesos sospechosos

### ¿Qué automatizarías en un siguiente nivel?
En un nivel avanzado automatizaría:

1. **CI/CD Completo**
   - Tests automáticos en cada commit
   - Despliegue automático a staging/producción
   - Rollbacks automáticos en caso de fallos

2. **Infraestructura Avanzada**
   - Auto-scaling basado en métricas
   - Blue/Green deployments
   - Canary deployments para nuevas features

3. **Monitoring y Alerting**
   - Alertas automáticas por métricas
   - Auto-recovery de servicios caídos
   - Análisis de logs con ELK Stack

4. **Seguridad Automatizada**
   - Scans de seguridad automáticos
   - Actualización automática de dependencias
   - Rotación automática de credenciales

5. **Optimización de Costos**
   - Apagado automático de recursos no usados
   - Spot instances para ambientes de desarrollo
   - Análisis de costos y recomendaciones

## Conclusiones

Este proyecto demuestra exitosamente la integración de múltiples tecnologías DevOps en un escenario real. La aplicación es funcional, escalable y sigue las mejores prácticas de desarrollo y despliegue. La experiencia adquirida abarca desde el desarrollo de software hasta la gestión de infraestructura en la nube, proporcionando una visión completa del ciclo de vida de una aplicación moderna.

El proyecto no solo cumple con todos los requisitos académicos, sino que también representa una base sólida para futuros desarrollos y mejora continua en prácticas de DevOps.
