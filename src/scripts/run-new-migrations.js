const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runNewMigrations() {
  console.log('🔄 Conectando a MySQL para nuevas migraciones...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  try {
    console.log('✅ Conexión establecida.');

    // 1. Migración Medio de Pago
    const sqlPaymentPath = path.join(__dirname, '../../database/add-payment-method.sql');
    if (fs.existsSync(sqlPaymentPath)) {
      const sqlPayment = fs.readFileSync(sqlPaymentPath, 'utf8');
      console.log('📜 Ejecutando add-payment-method.sql...');
      try {
        await connection.query(sqlPayment);
        console.log('✅ Columnas de medio de pago verificadas/creadas.');
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log('ℹ️ La columna payment_method ya existe en las tablas.');
        } else {
          console.error('⚠️ Detalle migración medio de pago:', err.message);
        }
      }
    }

    // 2. Migración Categorías Personalizadas
    const sqlCatPath = path.join(__dirname, '../../database/user-categories-migration.sql');
    if (fs.existsSync(sqlCatPath)) {
      const sqlCat = fs.readFileSync(sqlCatPath, 'utf8');
      console.log('📜 Ejecutando user-categories-migration.sql...');
      try {
        await connection.query(sqlCat);
        console.log('✅ Estructura de categorías por usuario verificada/actualizada.');
      } catch (err) {
        console.error('⚠️ Detalle migración categorías:', err.message);
      }
    }

    console.log('🎉 Migraciones adicionales completadas exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
  } finally {
    await connection.end();
  }
}

runNewMigrations();
