# Instrucciones para GitHub - Bitácora de Eventos

## Configuración del Repositorio

### 1. Crear Repositorio en GitHub
1. Ve a https://github.com y crea un nuevo repositorio
2. Nombre: `AvanceDelProyecto-DevOps`
3. Descripción: "Bitácora de Eventos - Proyecto DevOps con Docker, AWS y CloudFormation"
4. Marca como "Public" o "Private" según prefieras
5. NO inicialices con README (ya tenemos uno)

### 2. Conectar Repositorio Local
```bash
# Navegar al directorio del proyecto
cd "c:\Users\bysta\OneDrive\Documentos\TAREAS AARON UNIVERSIDAD\4 semestre\DevOps\Avance del proyecto"

# Inicializar Git si no está inicializado
git init

# Agregar remote
git remote add origin https://github.com/AaronND7/AvanceDelProyecto-DevOps.git

# Configurar usuario (si no está configurado)
git config user.name "Tu Nombre"
git config user.email "tu-email@example.com"
```

### 3. Estructura de Commits y Ramas

#### Commit 1: Estructura Inicial
```bash
# Agregar archivos de estructura
git add README.md docker-compose.yml deploy.sh start_app.sh stop_app.sh
git add backend/package.json backend/Dockerfile backend/.env
git add frontend/package.json frontend/Dockerfile frontend/.env
git add cloudformation/template.yaml architecture.md

# Commit inicial
git commit -m "feat: Crear estructura inicial del proyecto DevOps

- Configurar estructura de directorios (frontend, backend, cloudformation)
- Agregar Dockerfiles para frontend y backend
- Crear docker-compose.yml con MongoDB
- Implementar scripts Bash de automatización
- Crear template CloudFormation para AWS
- Agregar documentación inicial y diagrama de arquitectura"
```

#### Crear Rama Feature
```bash
# Crear rama para desarrollo del backend
git checkout -b feature/backend-api
```

#### Commit 2: Backend Completo
```bash
# Agregar archivos del backend
git add backend/src/app.js backend/init-mongo.js

# Commit del backend
git commit -m "feat: Implementar backend API completo con MongoDB

- Crear API RESTful con Express.js y Node.js
- Implementar endpoints CRUD para eventos
- Agregar sistema de logging con Winston
- Configurar conexión a MongoDB con Mongoose
- Implementar middleware de seguridad (Helmet, rate limiting)
- Agregar validación de datos y manejo de errores
- Crear script de inicialización de MongoDB con datos de ejemplo"
```

#### Commit 3: Frontend React
```bash
# Agregar archivos del frontend
git add frontend/src/index.js frontend/src/App.js frontend/src/index.css
git add frontend/public/index.html frontend/tailwind.config.js frontend/postcss.config.js

# Commit del frontend
git commit -m "feat: Desarrollar frontend React con TailwindCSS

- Implementar interfaz de usuario responsiva con React
- Crear componentes para gestión de eventos
- Agregar formulario de creación con validación
- Implementar sistema de filtrado y búsqueda
- Mostrar estadísticas en tiempo real
- Configurar TailwindCSS y PostCSS
- Integrar Axios para comunicación con backend API"
```

#### Commit 4: Documentación y Reporte
```bash
# Agregar documentación final
git add REPORTE_PROYECTO.md GITHUB_INSTRUCTIONS.md

# Commit de documentación
git commit -m "docs: Completar documentación del proyecto

- Agregar reporte completo del proyecto
- Incluir reflexión y preguntas de DevOps
- Documentar problemas encontrados y soluciones
- Crear instrucciones para GitHub
- Actualizar README con información completa"
```

### 4. Fusionar Ramas
```bash
# Volver a main
git checkout main

# Fusionar rama feature
git merge feature/backend-api

# Eliminar rama feature
git branch -d feature/backend-api
```

### 5. Push a GitHub
```bash
# Primer push
git push -u origin main

# Push de todas las ramas
git push origin --all
```

### 6. Verificación del Repositorio

#### Estructura Final en GitHub:
```
AvanceDelProyecto-DevOps/
|
|-- README.md
|-- docker-compose.yml
|-- deploy.sh
|-- start_app.sh
|-- stop_app.sh
|-- architecture.md
|-- REPORTE_PROYECTO.md
|-- GITHUB_INSTRUCTIONS.md
|
|-- backend/
|   |-- package.json
|   |-- Dockerfile
|   |-- .env
|   |-- src/
|   |   |-- app.js
|   |-- logs/
|   |   |-- (se creará al ejecutar)
|   |-- init-mongo.js
|
|-- frontend/
|   |-- package.json
|   |-- Dockerfile
|   |-- .env
|   |-- src/
|   |   |-- index.js
|   |   |-- App.js
|   |   |-- index.css
|   |-- public/
|   |   |-- index.html
|   |-- tailwind.config.js
|   |-- postcss.config.js
|
|-- cloudformation/
|   |-- template.yaml
```

### 7. Requisitos del Proyecto Cumplidos

#### Commits Significativos (3+):
1. **feat: Crear estructura inicial del proyecto DevOps**
2. **feat: Implementar backend API completo con MongoDB**  
3. **feat: Desarrollar frontend React con TailwindCSS**
4. **docs: Completar documentación del proyecto**

#### Ramas Utilizadas:
- `main` (rama principal)
- `feature/backend-api` (rama de desarrollo)

#### Elementos Incluidos:
- [x] Web Application completa (Frontend + Backend + DB)
- [x] Sistema de logs con Winston
- [x] Docker y Docker Compose
- [x] Scripts Bash de automatización
- [x] CloudFormation template
- [x] Documentación completa
- [x] Diagrama de arquitectura
- [x] Reporte del proyecto

### 8. Comandos Útiles

#### Ver estado del repositorio:
```bash
git status
git log --oneline --graph
git branch -a
```

#### Ver commits por autor:
```bash
git log --author="Tu Nombre" --oneline
```

#### Ver cambios entre commits:
```bash
git diff HEAD~1 HEAD
```

### 9. Configuración Adicional (Opcional)

#### Agregar .gitignore:
```bash
# Crear archivo .gitignore
echo "node_modules/
npm-debug.log
logs/
*.log
.env.local
.env.production
.DS_Store
build/
dist/" > .gitignore

git add .gitignore
git commit -m "chore: Agregar .gitignore"
```

#### Agregar GitHub Actions para CI/CD (futuro):
```bash
mkdir -p .github/workflows
# Aquí se podrían agregar workflows para testing y despliegue automático
```

### 10. Checklist Final

Antes de finalizar, verifica:

- [ ] Todos los commits tienen mensajes descriptivos
- [ ] La rama main está actualizada
- [ ] No hay archivos sensibles en el repositorio
- [ ] El README está completo y actualizado
- [ ] Los scripts tienen permisos de ejecución
- [ ] Los Dockerfiles están optimizados
- [ ] El template de CloudFormation es válido
- [ ] La documentación está completa

### 11. Preparación para Despliegue

Para desplegar en EC2:

1. **CloudFormation ya actualizado** con tu URL de GitHub:
   ```yaml
   # En template.yaml, línea 185:
   git clone https://github.com/AaronND7/AvanceDelProyecto-DevOps.git eventlog
   ```

2. **Crear Stack en AWS**:
   ```bash
   aws cloudformation create-stack \
     --stack-name bitacora-eventos-stack \
     --template-body file://cloudformation/template.yaml \
     --parameters ParameterKey=KeyName,ParameterValue=your-keypair \
     --capabilities CAPABILITY_IAM
   ```

3. **Monitorear despliegue**:
   ```bash
   aws cloudformation describe-stacks --stack-name bitacora-eventos-stack
   ```

¡Listo! Tu repositorio GitHub está completo y listo para evaluación.
