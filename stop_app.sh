#!/bin/bash

# Script para detener la aplicación Bitácora de Eventos
# Autor: Proyecto DevOps
# Descripción: Detiene los contenedores Docker de la aplicación

echo "=== Deteniendo Bitácora de Eventos ==="

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

# Detener los contenedores
echo "Deteniendo contenedores..."
docker-compose down

# Verificar que no queden contenedores corriendo
echo "Verificando que los contenedores se detuvieron..."
sleep 5

# Mostrar contenedores restantes (si hay)
remaining_containers=$(docker ps -q --filter "name=eventlog")
if [ -n "$remaining_containers" ]; then
    echo "ADVERTENCIA: Aún hay contenedores corriendo:"
    docker ps --filter "name=eventlog"
else
    echo "Todos los contenedores han sido detenidos correctamente"
fi

echo "=== Aplicación detenida ==="

# Opcional: Preguntar si se quieren eliminar los volúmenes
read -p "¿Desea eliminar también los volúmenes de datos? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Eliminando volúmenes..."
    docker-compose down -v
    echo "Volúmenes eliminados"
fi
