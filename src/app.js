const express = require('express');
const cors = require('cors');
const config = require('./config/environment');
const logger = require('./config/logger');
const requestLogger = require('./middlewares/request-logger.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');

// Rutas por módulo
const categoryRoutes = require('./routes/category.routes');
const yearRoutes = require('./routes/year.routes');
const monthRoutes = require('./routes/month.routes');
const incomeRoutes = require('./routes/income.routes');
const expenseRoutes = require('./routes/expense.routes');
const weekRoutes = require('./routes/week.routes');
const challengeRoutes = require('./routes/challenge.routes');
const summaryRoutes = require('./routes/summary.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Ruta de comprobación de estado (Health Check)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: '熊猫理财 El panda ahorrador API',
    timestamp: new Date()
  });
});

// Registro de endpoints de API
app.use('/api/categories', categoryRoutes);
app.use('/api/years', yearRoutes);
app.use('/api/months', monthRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/weeks', weekRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/summary', summaryRoutes);

// Handling 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.originalUrl}` });
});

// Middleware global de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(config.port, () => {
  logger.info(`===========================================================`);
  logger.info(`🌸 熊猫理财 El panda ahorrador - Backend API corriendo en http://localhost:${config.port}`);
  logger.info(`🗄️ Base de datos: MySQL CleverCloud (${config.db.database})`);
  logger.info(`===========================================================`);
});

module.exports = app;
