#!/bin/bash

# Script de despliegue para Bitácora de Eventos
# Autor: Proyecto DevOps
# Descripción: Prepara y despliega la aplicación completa

echo "=== Iniciando despliegue de Bitácora de Eventos ==="

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker no está instalado"
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "ERROR: Docker Compose no está instalado"
    exit 1
fi

# Detener contenedores existentes
echo "Deteniendo contenedores existentes..."
docker-compose down 2>/dev/null || true

# Limpiar imágenes antiguas (opcional)
echo "Limpiando imágenes antiguas..."
docker system prune -f

# Construir y levantar contenedores
echo "Construyendo y levantando contenedores..."
docker-compose up --build -d

# Esperar a que los servicios estén listos
echo "Esperando a que los servicios se inicien..."
sleep 30

# Verificar estado de los contenedores
echo "Verificando estado de los contenedores:"
docker-compose ps

# Verificar que los servicios respondan
echo "Verificando servicios..."

# Verificar backend
if curl -f http://localhost:5000/api/health &> /dev/null; then
    echo "Backend: OK"
else
    echo "Backend: ERROR - No responde"
fi

# Verificar frontend
if curl -f http://localhost:3000 &> /dev/null; then
    echo "Frontend: OK"
else
    echo "Frontend: ERROR - No responde"
fi

# Mostrar logs recientes
echo "=== Logs recientes del backend ==="
docker-compose logs --tail=10 backend

echo "=== Despliegue completado ==="
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo "MongoDB: localhost:27017"
echo ""
echo "Para ver logs en tiempo real:"
echo "  docker-compose logs -f backend"
echo "  docker-compose logs -f frontend"
echo "  docker-compose logs -f mongodb"
echo ""
echo "Para detener la aplicación:"
echo "  ./stop_app.sh"
