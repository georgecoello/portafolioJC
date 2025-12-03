// server.js - CÓDIGO COMPLETO CONFIGURADO PARA GMAIL
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== CONFIGURACIÓN CORS ====================
// URLs exactas de tus proyectos
const allowedOrigins = [
  'http://localhost:5173',                    // Desarrollo local Vue
  'http://localhost:3000',                    // Desarrollo local backend
  'https://portafolio-jorge-coello.vercel.app',      // TU FRONTEND EN VERCEL
  'https://portafolio-backend-jorge-coello.vercel.app' // Tu backend
];

// Configuración CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps, curl, Postman)
    if (!origin && process.env.NODE_ENV === 'development') {
      console.log('⚠️ Request sin origin header (posible herramienta de testing)');
      return callback(null, true);
    }
    
    console.log('🌐 Origen de la solicitud:', origin || 'No origin header');
    
    // En desarrollo, permitir cualquier origen para facilitar testing
    if (process.env.NODE_ENV === 'development') {
      console.log(' Modo desarrollo - permitiendo cualquier origen');
      return callback(null, true);
    }
    
    // En producción, verificar origen permitido
    if (allowedOrigins.includes(origin)) {
      console.log(' Origen permitido:', origin);
      return callback(null, true);
    } else {
      console.log('❌ Origen bloqueado por CORS:', origin);
      const error = new Error('Origen no permitido por la política CORS');
      error.status = 403;
      return callback(error, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'X-Api-Key'
  ],
  exposedHeaders: [
    'Content-Length',
    'Content-Type',
    'X-Request-Id',
    'X-Response-Time'
  ],
  maxAge: 86400, // 24 horas en segundos
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Manejar preflight requests explícitamente
app.options('*', cors(corsOptions));

// ==================== MIDDLEWARE ====================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log('\n📨 Nueva solicitud:');
  console.log(`   ${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`   Origin: ${req.headers.origin || 'No origin'}`);
  console.log(`   IP: ${req.ip}`);
  console.log(`   User-Agent: ${req.headers['user-agent']?.substring(0, 50)}...`);
  next();
});

// ==================== CONFIGURACIÓN NODEMAILER PARA GMAIL ====================
console.log('\n CONFIGURANDO NODEMAILER PARA GMAIL');
console.log('='.repeat(50));

// Mostrar configuración (sin contraseña completa por seguridad)
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const recipientEmail = process.env.RECIPIENT_EMAIL || 'jorgecoello1998@hotmail.com';

console.log(`🔐 Configuración de email:`);
console.log(`   EMAIL_USER: ${emailUser || 'NO CONFIGURADO'}`);
console.log(`   EMAIL_PASS: ${emailPass ? '***' + emailPass.slice(-4) : 'NO CONFIGURADO'}`);
console.log(`   Longitud pass: ${emailPass?.length || 0} caracteres`);
console.log(`   RECIPIENT_EMAIL: ${recipientEmail}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// Validar configuración antes de crear el transporter
if (!emailUser || !emailPass) {
  console.error('\n❌ ERROR CRÍTICO: Faltan variables de entorno');
  console.error('   Por favor configura en Vercel Dashboard:');
  console.error('   1. EMAIL_USER=tuemail@gmail.com');
  console.error('   2. EMAIL_PASS=app_password_de_16_caracteres');
  console.error('   3. RECIPIENT_EMAIL=jorgecoello1998@hotmail.com');
  console.error('\n💡 Para obtener App Password de Gmail:');
  console.error('   1. Ve a: https://myaccount.google.com/apppasswords');
  console.error('   2. Activa 2-Step Verification primero');
  console.error('   3. Genera App Password para "Mail"');
  console.error('   4. Copia los 16 caracteres SIN ESPACIOS');
} else {
  console.log('\n Variables de entorno configuradas correctamente');
}

// Crear transporter para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usar servicio Gmail directamente
  auth: {
    user: emailUser,
    pass: emailPass
  },
  // Configuración adicional para mejor rendimiento
  pool: true, // Usar conexión persistente
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
  // Debug según entorno
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Verificar conexión con Gmail inmediatamente
console.log('\n🔐 Verificando conexión con Gmail...');
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ ERROR DE CONEXIÓN CON GMAIL:');
    console.error('   Código:', error.code);
    console.error('   Mensaje:', error.message);
    console.error('   Comando:', error.command);
    
    console.log('\n💡 SOLUCIONES PARA GMAIL:');
    console.log('   1. VERIFICA que tienes 2-Step Verification ACTIVADO');
    console.log('   2. VERIFICA que generaste App Password (no contraseña normal)');
    console.log('   3. VERIFICA que el App Password tiene 16 caracteres SIN espacios');
    console.log('   4. VERIFICA que EMAIL_USER es el email COMPLETO (ej: tuemail@gmail.com)');
    console.log('\n🔗 Enlaces útiles:');
    console.log('   • App Passwords: https://myaccount.google.com/apppasswords');
    console.log('   • 2-Step Verification: https://myaccount.google.com/security');
    
    if (error.code === 'EAUTH' && emailPass && emailPass.length !== 16) {
      console.log('\n🎯 PROBLEMA DETECTADO: La contraseña no tiene 16 caracteres');
      console.log(`   Longitud actual: ${emailPass.length} caracteres`);
      console.log('   El App Password de Gmail SIEMPRE tiene 16 caracteres');
    }
  } else {
    console.log(' CONEXIÓN GMAIL ESTABLECIDA CORRECTAMENTE');
    console.log('   Servicio: Gmail');
    console.log('   Usuario:', emailUser);
    console.log('   Destinatario principal:', recipientEmail);
  }
});

// ==================== RUTAS ====================

// Ruta raíz - Información del servidor
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backend de Portfolio - Jorge Coello',
    status: 'online',
    version: '1.0.0',
    service: 'Gmail Email Service',
    endpoints: {
      home: '/',
      health: '/api/health',
      sendEmail: '/api/send-email (POST)',
      testEmail: '/api/test-email (GET)',
      testGmail: '/api/test-gmail (GET)',
      corsTest: '/api/cors-test'
    },
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: 'https://portafolio-jorge-coello.vercel.app',
    backendUrl: 'https://portafolio-backend-jorge-coello.vercel.app',
    emailService: emailUser ? 'Configurado' : 'No configurado',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Portfolio Backend API',
    emailService: 'Gmail',
    emailConfigured: !!(emailUser && emailPass),
    frontendUrl: 'https://portafolio-jorge-coello.vercel.app',
    backendUrl: 'https://portafolio-backend-jorge-coello.vercel.app',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test CORS
app.get('/api/cors-test', (req, res) => {
  res.json({
    success: true,
    message: ' CORS configurado correctamente',
    yourOrigin: req.headers.origin || 'No origin header',
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
});

// Test específico para Gmail
app.get('/api/test-gmail', async (req, res) => {
  console.log('\n🧪 SOLICITUD DE PRUEBA GMAIL');
  
  try {
    // Verificar configuración
    if (!emailUser || !emailPass) {
      throw new Error('Faltan variables de entorno EMAIL_USER o EMAIL_PASS');
    }
    
    console.log('🔐 Verificando autenticación con Gmail...');
    
    // Verificar conexión primero
    await transporter.verify();
    console.log(' Autenticación Gmail OK');
    
    // Configurar email de prueba
    const testMailOptions = {
      from: `"Portfolio Backend" <${emailUser}>`,
      to: recipientEmail,
      subject: ' Gmail Configurado Correctamente - Portfolio',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .success { color: #2ecc71; font-weight: bold; }
            .info { background: #e8f4fc; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1> Gmail Configurado Correctamente</h1>
          </div>
          <div class="content">
            <p class="success">¡Felicidades! Tu backend está configurado correctamente con Gmail.</p>
            
            <div class="info">
              <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-PE')}</p>
              <p><strong>🔗 Backend:</strong> https://portafolio-backend-jorge-coello.vercel.app</p>
              <p><strong>🌐 Frontend:</strong> https://portafolio-jorge-coello.vercel.app</p>
              <p><strong> Servicio:</strong> Gmail</p>
              <p><strong> Email emisor:</strong> ${emailUser}</p>
              <p><strong>📨 Email receptor:</strong> ${recipientEmail}</p>
            </div>
            
            <p>🎉 ¡El sistema de envío de emails está funcionando correctamente!</p>
            <p>Ahora puedes usar el formulario de contacto en tu portfolio.</p>
          </div>
        </body>
        </html>
      `,
      text: ` GMAIL CONFIGURADO CORRECTAMENTE

¡Felicidades! Tu backend está configurado correctamente con Gmail.

📅 Fecha: ${new Date().toLocaleString('es-PE')}
🔗 Backend: https://portafolio-backend-jorge-coello.vercel.app
🌐 Frontend: https://portafolio-jorge-coello.vercel.app
 Servicio: Gmail
 Email emisor: ${emailUser}
📨 Email receptor: ${recipientEmail}

🎉 ¡El sistema de envío de emails está funcionando correctamente!

Ahora puedes usar el formulario de contacto en tu portfolio.
      `
    };
    
    console.log(' Enviando email de prueba...');
    const info = await transporter.sendMail(testMailOptions);
    
    console.log(' Email de prueba enviado exitosamente');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    
    res.json({
      success: true,
      message: 'Gmail configurado correctamente. Email de prueba enviado.',
      config: {
        emailUser: emailUser,
        emailPassLength: emailPass.length,
        recipientEmail: recipientEmail,
        service: 'gmail'
      },
      emailInfo: {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error en prueba Gmail:', error);
    
    const errorResponse = {
      success: false,
      message: 'Error configurando Gmail',
      error: error.code || error.message,
      config: {
        emailUser: emailUser || 'No configurado',
        emailPassConfigured: !!emailPass,
        emailPassLength: emailPass?.length || 0,
        recipientEmail: recipientEmail
      },
      solution: {
        step1: 'Activa 2-Step Verification en Google Account',
        step2: 'Genera App Password en https://myaccount.google.com/apppasswords',
        step3: 'Usa los 16 caracteres SIN ESPACIOS en EMAIL_PASS',
        step4: 'Asegúrate que EMAIL_USER sea el email COMPLETO'
      },
      links: {
        appPasswords: 'https://myaccount.google.com/apppasswords',
        twoStepVerification: 'https://myaccount.google.com/security',
        lessSecureApps: 'https://myaccount.google.com/lesssecureapps'
      },
      timestamp: new Date().toISOString()
    };
    
    res.status(500).json(errorResponse);
  }
});

// Ruta principal para enviar correo
app.post('/api/send-email', async (req, res) => {
  console.log('\n📩 SOLICITUD DE ENVÍO DE EMAIL');
  console.log('='.repeat(50));
  
  try {
    const { name, email, subject, message } = req.body;
    
    // Log de datos recibidos
    console.log(' Datos recibidos:');
    console.log('   Nombre:', name);
    console.log('   Email:', email);
    console.log('   Asunto:', subject);
    console.log('   Mensaje (primeros 100 chars):', message?.substring(0, 100) + (message?.length > 100 ? '...' : ''));

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      console.log('❌ Validación fallida: Campos faltantes');
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos: nombre, email, asunto y mensaje',
        receivedData: { 
          name: !!name, 
          email: !!email, 
          subject: !!subject, 
          message: !!message 
        },
        timestamp: new Date().toISOString()
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validación fallida: Email inválido');
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa un email válido',
        receivedEmail: email,
        timestamp: new Date().toISOString()
      });
    }

    // Validar longitud mínima
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'El nombre debe tener al menos 2 caracteres',
        timestamp: new Date().toISOString()
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'El mensaje debe tener al menos 10 caracteres',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log(' Validaciones pasadas correctamente');
    
    // Verificar configuración de email
    if (!emailUser || !emailPass) {
      console.error('❌ Configuración de email incompleta');
      return res.status(503).json({
        success: false,
        message: 'El servicio de email no está configurado. Por favor contacta al administrador.',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log(' Configurando email para:', recipientEmail);
    
    // Configurar el correo HTML mejorado
    const mailOptions = {
      from: `"Portfolio Contacto" <${emailUser}>`,
      to: recipientEmail,
      subject: ` Nuevo mensaje de ${name}: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background: #f5f7fa;
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: #2c3e50; 
              padding: 30px; 
              text-align: center; 
              border-radius: 10px 10px 0 0; 
              margin-bottom: 0;
            }
            .content { 
              background: white; 
              padding: 30px; 
              border-radius: 0 0 10px 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .field { 
              margin-bottom: 20px; 
              padding: 15px; 
              background: #f8f9fa; 
              border-radius: 8px; 
              border-left: 4px solid #667eea; 
            }
            .label { 
              font-weight: bold; 
              color: #2c3e50; 
              display: block; 
              margin-bottom: 5px; 
              font-size: 14px;
            }
            .value {
              color: #34495e;
              font-size: 16px;
            }
            .message-box { 
              background: white; 
              padding: 20px; 
              border-radius: 8px; 
              border: 1px solid #e1e8ed; 
              white-space: pre-wrap; 
              font-family: 'Courier New', monospace;
              font-size: 14px;
              line-height: 1.5;
              margin-top: 10px;
            }
            .footer { 
              margin-top: 30px; 
              text-align: center; 
              color: #7f8c8d; 
              font-size: 12px; 
              border-top: 1px solid #eee; 
              padding-top: 15px; 
            }
            .highlight { 
              color: #3498db; 
              font-weight: bold; 
            }
            .email-link {
              color: #3498db;
              text-decoration: none;
            }
            .email-link:hover {
              text-decoration: underline;
            }
            .tech-info {
              background: #e8f4fc;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #3498db;
              margin-top: 20px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;"> Nuevo Contacto Portfolio</h1>
            <p style="margin: 10px 0 0; opacity: 0.9; font-size: 14px;">Mensaje recibido desde tu portfolio web</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label"> Nombre:</span>
              <span class="value highlight">${name}</span>
            </div>
            
            <div class="field">
              <span class="label"> Email:</span>
              <a href="mailto:${email}" class="email-link value">${email}</a>
            </div>
            
            <div class="field">
              <span class="label"> Asunto:</span>
              <span class="value">${subject}</span>
            </div>
            
            <div style="margin: 25px 0;">
              <span class="label"> Mensaje:</span>
              <div class="message-box">${message}</div>
            </div>
            
          </div>
          
          <div class="footer">
            <p>Este mensaje fue enviado automáticamente desde el formulario de contacto de tu portfolio.</p>
            <p> <a href="https://portafolio-jorge-coello.vercel.app" style="color: #7f8c8d;">https://portafolio-jorge-coello.vercel.app</a></p>
          </div>
        </body>
        </html>
      `,
      text: `
NUEVO MENSAJE DE CONTACTO - PORTFOLIO

 Nombre: ${name}
 Email: ${email}
 Asunto: ${subject}

 Mensaje:
${message}



---
 Portfolio: https://portafolio-jorge-coello.vercel.app
Este mensaje fue enviado automáticamente desde el formulario de contacto.
      `
    };

    console.log(' Enviando email a través de Gmail...');
    
    // Enviar correo
    const info = await transporter.sendMail(mailOptions);
    
    console.log(' CORREO ENVIADO EXITOSAMENTE');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('   Accepted:', info.accepted);
    console.log('   Rejected:', info.rejected);
    
    res.status(200).json({
      success: true,
      message: '¡Mensaje enviado con éxito! Te contactaré pronto.',
      messageId: info.messageId,
      recipient: recipientEmail,
      timestamp: new Date().toISOString(),
      details: {
        from: emailUser,
        to: recipientEmail,
        subject: mailOptions.subject
      }
    });
    
  } catch (error) {
    console.error('❌ ERROR CRÍTICO AL ENVIAR CORREO:');
    console.error('   Código:', error.code);
    console.error('   Mensaje:', error.message);
    console.error('   Stack:', error.stack);
    
    // Mensajes de error específicos para Gmail
    let errorMessage = 'Error al procesar tu solicitud. ';
    let statusCode = 500;
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticación con Gmail. ';
      statusCode = 503;
      console.log('\n💡 SOLUCIÓN PARA ERROR EAUTH (Gmail):');
      console.log('   1. Verifica que tienes 2-Step Verification ACTIVADO');
      console.log('   2. Usa App Password (16 caracteres), no contraseña normal');
      console.log('   3. Verifica en Vercel Dashboard las variables:');
      console.log('      EMAIL_USER=tuemail@gmail.com');
      console.log('      EMAIL_PASS=app_password_de_16_caracteres');
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Error de conexión con el servidor de Gmail. ';
      statusCode = 503;
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Error en la configuración del correo. ';
      statusCode = 400;
    } else if (error.message.includes('Invalid login') || error.message.includes('535-5.7.8')) {
      errorMessage = 'Credenciales de Gmail inválidas. Usa App Password. ';
      statusCode = 503;
    }
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage + 'Por favor intenta nuevamente más tarde.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: error.code,
      timestamp: new Date().toISOString(),
      solution: error.code === 'EAUTH' ? {
        step1: 'Activa 2-Step Verification en Google',
        step2: 'Genera App Password de 16 caracteres',
        step3: 'Usa App Password en EMAIL_PASS (no contraseña normal)',
        link: 'https://myaccount.google.com/apppasswords'
      } : undefined
    });
  }
});

// ==================== MANEJO DE ERRORES ====================

// Ruta 404
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    requestedUrl: req.url,
    availableEndpoints: {
      GET: ['/', '/api/health', '/api/cors-test', '/api/test-email', '/api/test-gmail'],
      POST: ['/api/send-email']
    },
    timestamp: new Date().toISOString()
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('🔥 Error global no manejado:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      fullError: err.toString()
    }),
    timestamp: new Date().toISOString()
  });
});

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SERVIDOR INICIADO - CONFIGURADO PARA GMAIL');
  console.log('='.repeat(60));
  console.log(` Puerto: ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL Local: http://localhost:${PORT}`);
  console.log(`🔗 URL Producción: https://portafolio-backend-jorge-coello.vercel.app`);
  console.log(` Email Service: GMAIL`);
  console.log(` Email configurado: ${emailUser ? 'Sí' : 'No'}`);
  console.log(`🔐 App Password: ${emailPass ? 'Configurado' : 'No configurado'}`);
  console.log(`🎯 Frontend: https://portafolio-jorge-coello.vercel.app`);
  console.log(`📨 Receptor: ${recipientEmail}`);
  console.log('='.repeat(60));
  console.log('\n📋 Endpoints disponibles:');
  console.log('   GET  /                 → Información del servidor');
  console.log('   GET  /api/health       → Health check');
  console.log('   GET  /api/cors-test    → Prueba CORS');
  console.log('   GET  /api/test-gmail   → Prueba Gmail (RECOMENDADO)');
  console.log('   POST /api/send-email   → Enviar mensaje de contacto');
  console.log('='.repeat(60));
  console.log('\n💡 PARA CONFIGURAR GMAIL:');
  console.log('   1. Activa 2-Step Verification en Google');
  console.log('   2. Genera App Password (16 caracteres)');
  console.log('   3. Configura en Vercel Dashboard:');
  console.log('      EMAIL_USER=tuemail@gmail.com');
  console.log('      EMAIL_PASS=app_password_de_16_caracteres');
  console.log('      RECIPIENT_EMAIL=jorgecoello1998@hotmail.com');
  console.log('='.repeat(60));
});