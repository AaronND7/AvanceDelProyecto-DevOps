const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
require('dotenv').config();

// Configuración de logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes
});
app.use(limiter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  logger.info('Conectado a MongoDB');
})
.catch((error) => {
  logger.error('Error al conectar a MongoDB: ' + error.message);
  process.exit(1);
});

// Modelo de Evento
const Event = mongoose.model('Event', {
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Rutas
app.get('/api/events', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const events = await Event.find(query).sort({ date: -1 });
    logger.info(`Consulta realizada: ${events.length} eventos encontrados`);
    res.json(events);
  } catch (error) {
    logger.error('Error al obtener eventos: ' + error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { title, description, category, date } = req.body;
    
    if (!title || !description || !category || !date) {
      logger.warn('Intento de crear evento con datos incompletos');
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    const event = new Event({
      title,
      description,
      category,
      date: new Date(date)
    });
    
    await event.save();
    logger.info(`Evento creado: ${title}`);
    res.status(201).json(event);
  } catch (error) {
    logger.error('Error al crear evento: ' + error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      logger.warn(`Intento de eliminar evento no encontrado: ${req.params.id}`);
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    
    logger.info(`Evento eliminado: ${event.title}`);
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    logger.error('Error al eliminar evento: ' + error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const eventsByCategory = await Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    logger.info('Estadísticas solicitadas');
    res.json({
      totalEvents,
      eventsByCategory
    });
  } catch (error) {
    logger.error('Error al obtener estadísticas: ' + error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.get('/api/health', (req, res) => {
  logger.info('Health check realizado');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de errores
app.use((err, req, res, next) => {
  logger.error('Error no manejado: ' + err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Servidor backend iniciado en puerto ${PORT}`);
});

module.exports = app;
