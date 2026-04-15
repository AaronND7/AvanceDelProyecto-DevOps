#!/bin/bash

# Actualizar sistema
yum update -y

# Instalar Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Instalar Git
yum install -y git

# Clonar repositorio
cd /home/ec2-user
git clone https://github.com/AaronND7/AvanceDelProyecto-DevOps.git
cd AvanceDelProyecto-DevOps

# Dar permisos a scripts
chmod +x deploy.sh start_app.sh stop_app.sh

# Ejecutar deploy
./deploy.sh

# Configurar nginx para redirección
yum install -y nginx
systemctl start nginx
systemctl enable nginx

# Crear configuración nginx
cat > /etc/nginx/conf.d/eventlog.conf << EOF
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

systemctl restart nginx
