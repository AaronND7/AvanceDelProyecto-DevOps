// Script de inicialización para MongoDB
db = db.getSiblingDB('eventlog');

// Crear usuario para la aplicación
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'eventlog'
    }
  ]
});

// Crear colección de eventos
db.createCollection('events');

// Insertar datos de ejemplo
db.events.insertMany([
  {
    title: "Inicio del Proyecto DevOps",
    description: "Comenzamos el desarrollo de la bitácora de eventos con Docker y AWS",
    category: "trabajo",
    date: new Date("2026-04-01"),
    createdAt: new Date()
  },
  {
    title: "Configuración de MongoDB",
    description: "Se configuró la base de datos MongoDB con Docker",
    category: "técnico",
    date: new Date("2026-04-02"),
    createdAt: new Date()
  },
  {
    title: "Deploy en AWS",
    description: "Despliegue exitoso en instancia EC2",
    category: "producción",
    date: new Date("2026-04-10"),
    createdAt: new Date()
  }
]);

print("Base de datos inicializada correctamente");
