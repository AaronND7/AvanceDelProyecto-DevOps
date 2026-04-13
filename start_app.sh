#!/bin/bash

# Script para iniciar la aplicación Bitácora de Eventos
# Autor: Proyecto DevOps
# Descripción: Inicia los contenedores Docker de la aplicación

echo "=== Iniciando Bitácora de Eventos ==="

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

# Iniciar los contenedores
echo "Iniciando contenedores..."
docker-compose up -d

# Esperar a que los servicios se inicien
echo "Esperando a que los servicios se inicien..."
sleep 15

# Verificar estado de los contenedores
echo "Estado de los contenedores:"
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

echo "=== Aplicación iniciada ==="
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo ""
echo "Para ver logs:"
echo "  docker-compose logs -f"
