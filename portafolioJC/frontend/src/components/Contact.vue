<template>
  <section class="contact" id="contact">
    <div class="container">
      <h2>Contacto</h2>
      <p class="contact-description">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      
      <!-- Mensajes de estado -->
      <div v-if="messageStatus" :class="['status-message', messageStatus.type]">
        <span class="status-icon">
          <span v-if="messageStatus.type === 'success'">✅</span>
          <span v-if="messageStatus.type === 'error'">❌</span>
          <span v-if="messageStatus.type === 'warning'">⚠️</span>
        </span>
        <span class="status-text">{{ messageStatus.text }}</span>
        <button v-if="messageStatus.type === 'error' || messageStatus.type === 'warning'" 
                @click="messageStatus = null" 
                class="close-btn">
          ×
        </button>
      </div>
      
      <div class="contact-content">
        <!-- Información de contacto -->
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-details">
              <h3>Email</h3>
              <p>jorgecoello1998@hotmail.com</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-details">
              <h3>Teléfono</h3>
              <p>+504 9642-2659</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-details">
              <h3>Ubicación</h3>
              <p>Tegucigalpa, Honduras</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-details">
              <h3>Tiempo de Respuesta</h3>
              <p>24 - 48 horas</p>
            </div>
          </div>
        </div>
        
        <!-- Formulario -->
        <form class="contact-form" @submit.prevent="submitForm" novalidate>
          <div class="form-group">
            <label for="name">
              <span class="required">*</span> Nombre Completo
            </label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Ej: Juan Pérez"
              :disabled="isLoading"
              @input="clearError('name')"
              :class="{ 'error-border': errors.name }"
              maxlength="100"
            >
            <span v-if="errors.name" class="error-message">
              ⚠️ {{ errors.name }}
            </span>
          </div>
          
          <div class="form-group">
            <label for="email">
              <span class="required">*</span> Correo Electrónico
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="ejemplo@email.com"
              :disabled="isLoading"
              @input="clearError('email')"
              :class="{ 'error-border': errors.email }"
              maxlength="100"
            >
            <span v-if="errors.email" class="error-message">
              ⚠️ {{ errors.email }}
            </span>
          </div>
          
          <div class="form-group">
            <label for="subject">
              <span class="required">*</span> Asunto
            </label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              required
              placeholder="¿En qué puedo ayudarte?"
              :disabled="isLoading"
              @input="clearError('subject')"
              :class="{ 'error-border': errors.subject }"
              maxlength="200"
            >
            <span v-if="errors.subject" class="error-message">
              ⚠️ {{ errors.subject }}
            </span>
          </div>
          
          <div class="form-group">
            <label for="message">
              <span class="required">*</span> Mensaje
            </label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="6" 
              required
              placeholder="Describe tu proyecto, idea o consulta..."
              :disabled="isLoading"
              @input="clearError('message'); updateCharCount()"
              :class="{ 'error-border': errors.message }"
              maxlength="2000"
            ></textarea>
            <div class="form-footer">
              <div class="char-counter" :class="{ 'warning': form.message.length > 1800 }">
                {{ form.message.length }}/2000 caracteres
              </div>
              <span v-if="errors.message" class="error-message">
                ⚠️ {{ errors.message }}
              </span>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isLoading || !isBackendOnline"
              :class="{ 
                'loading': isLoading,
                'disabled': !isBackendOnline
              }"
            >
              <span v-if="isLoading" class="spinner"></span>
              <template v-if="isLoading">
                Enviando...
              </template>
              <template v-else-if="!isBackendOnline">
                ⚠️ Servidor no disponible
              </template>
              <template v-else>
                📨 Enviar Mensaje
              </template>
            </button>
            
            <button 
              type="button" 
              class="btn btn-secondary"
              @click="resetForm"
              :disabled="isLoading"
            >
              Limpiar
            </button>
          </div>
          
          <p class="form-note">
            <span class="required">*</span> Campos obligatorios. 
            Respeto tu privacidad, no compartiré tu información.
          </p>
          
          <div class="debug-info" v-if="showDebug">
            <hr>
            <details>
              <summary>🔧 Información de depuración</summary>
              <div class="debug-content">
                <p><strong>Frontend:</strong> {{ frontendUrl }}</p>
                <p><strong>Backend:</strong> {{ backendUrl }}</p>
                <p><strong>Endpoint:</strong> {{ apiEndpoint }}</p>
                <p><strong>Estado backend:</strong> {{ isBackendOnline ? 'En línea' : 'Fuera de línea' }}</p>
                <p><strong>Entorno:</strong> {{ environment }}</p>
                <button @click="testConnection" class="btn-debug">
                  Probar conexión
                </button>
              </div>
            </details>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      // Información de contacto
      email: 'jorgecoello1998@hotmail.com',
      phone: '+51 987 654 321',
      location: 'Lima, Perú',
      
      // Formulario
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      
      // Errores de validación
      errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      
      // Estado
      isLoading: false,
      isBackendOnline: false,
      checkingBackend: false,
      messageStatus: null,
      
      // URLs (configurables)
      backendUrl: '',
      frontendUrl: window.location.origin,
      environment: import.meta.env.MODE || 'development',
      
      // Debug
      showDebug: false
    };
  },
  
  computed: {
    apiEndpoint() {
      return `${this.backendUrl}/api/send-email`;
    }
  },
  
  created() {
    // Configurar URLs según el entorno
    this.configureUrls();
    
    // Mostrar información en consola para debug
    this.logDebugInfo();
    
    // Verificar conexión con el backend
    this.checkBackendConnection();
    
    // Habilitar debug con Ctrl+Shift+D
    this.setupDebugShortcut();
  },
  
  methods: {
    // ========== CONFIGURACIÓN ==========
    configureUrls() {
      // Determinar si estamos en desarrollo o producción
      const isLocal = this.frontendUrl.includes('localhost') || 
                     this.frontendUrl.includes('127.0.0.1');
      
      if (isLocal) {
        // Desarrollo local
        this.backendUrl = 'http://localhost:3000';
      } else {
        // Producción - usar tu backend real en Vercel
        this.backendUrl = 'https://portafolio-backend-jorge-coello.vercel.app';
      }
      
      // Sobrescribir con variable de entorno si existe
      if (import.meta.env.VITE_BACKEND_URL) {
        this.backendUrl = import.meta.env.VITE_BACKEND_URL;
      }
    },
    
    logDebugInfo() {
      // Método removido - no mostrar URLs sensibles en console
    },
    
    setupDebugShortcut() {
      window.addEventListener('keydown', (e) => {
        // Ctrl+Shift+D para toggle debug
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
          this.showDebug = !this.showDebug;
        }
      });
    },
    
    // ========== CONEXIÓN BACKEND ==========
    async checkBackendConnection() {
      if (this.checkingBackend) return;
      
      this.checkingBackend = true;
      
      try {
        const healthUrl = `${this.backendUrl}/api/health`;
        
        const response = await fetch(healthUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          mode: 'cors',
          cache: 'no-cache'
        });
        
        if (response.ok) {
          const data = await response.json();
          this.isBackendOnline = true;
        } else {
          this.isBackendOnline = false;
        }
      } catch (error) {
        this.isBackendOnline = false;
        
        // Mostrar advertencia solo si ya pasó un tiempo desde la carga
        if (Date.now() - this._createdAt > 3000) {
          this.showMessage(
            'El servidor de contacto no está disponible temporalmente. ' +
            'Puedes contactarme directamente por email.',
            'warning'
          );
        }
      } finally {
        this.checkingBackend = false;
        
        // Reintentar en 30 segundos si está offline
        if (!this.isBackendOnline) {
          setTimeout(() => this.checkBackendConnection(), 30000);
        }
      }
    },
    
    async testConnection() {
      try {
        const corsUrl = `${this.backendUrl}/api/cors-test`;
        const response = await fetch(corsUrl);
        const data = await response.json();
        
        this.showMessage('Conexión con backend verificada correctamente', 'success');
      } catch (error) {
        this.showMessage('Error en la conexión: ' + error.message, 'error');
      }
    },
    
    // ========== VALIDACIÓN ==========
    validateForm() {
      let isValid = true;
      this.errors = { name: '', email: '', subject: '', message: '' };
      
      // Validar nombre
      const name = this.form.name.trim();
      if (!name) {
        this.errors.name = 'El nombre es requerido';
        isValid = false;
      } else if (name.length < 2) {
        this.errors.name = 'El nombre debe tener al menos 2 caracteres';
        isValid = false;
      } else if (name.length > 100) {
        this.errors.name = 'El nombre no puede exceder 100 caracteres';
        isValid = false;
      }
      
      // Validar email
      const email = this.form.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        this.errors.email = 'El email es requerido';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        this.errors.email = 'Ingresa un email válido';
        isValid = false;
      } else if (email.length > 100) {
        this.errors.email = 'El email no puede exceder 100 caracteres';
        isValid = false;
      }
      
      // Validar asunto
      const subject = this.form.subject.trim();
      if (!subject) {
        this.errors.subject = 'El asunto es requerido';
        isValid = false;
      } else if (subject.length < 5) {
        this.errors.subject = 'El asunto debe tener al menos 5 caracteres';
        isValid = false;
      } else if (subject.length > 200) {
        this.errors.subject = 'El asunto no puede exceder 200 caracteres';
        isValid = false;
      }
      
      // Validar mensaje
      const message = this.form.message.trim();
      if (!message) {
        this.errors.message = 'El mensaje es requerido';
        isValid = false;
      } else if (message.length < 10) {
        this.errors.message = 'El mensaje debe tener al menos 10 caracteres';
        isValid = false;
      } else if (message.length > 2000) {
        this.errors.message = 'El mensaje no puede exceder 2000 caracteres';
        isValid = false;
      }
      
      return isValid;
    },
    
    clearError(field) {
      if (this.errors[field]) {
        this.errors[field] = '';
      }
    },
    
    updateCharCount() {
      // Se ejecuta automáticamente al escribir en el textarea
    },
    
    // ========== ENVÍO DEL FORMULARIO ==========
    async submitForm() {
      // Verificar que el backend esté en línea
      if (!this.isBackendOnline) {
        this.showMessage(
          'El servidor de contacto no está disponible temporalmente. ' +
          'Por favor, inténtalo más tarde o contáctame directamente por email.',
          'error'
        );
        return;
      }
      
      // Validar formulario
      if (!this.validateForm()) {
        this.showMessage('Por favor corrige los errores en el formulario', 'error');
        
        // Hacer scroll al primer error
        this.scrollToFirstError();
        return;
      }
      
      this.isLoading = true;
      this.messageStatus = null;
      
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.form),
          mode: 'cors',
          cache: 'no-cache'
        });
        
        let data;
        try {
          const text = await response.text();
          
          if (text) {
            data = JSON.parse(text);
          } else {
            throw new Error('Respuesta vacía del servidor');
          }
        } catch (parseError) {
          throw new Error('Respuesta inválida del servidor');
        }
        
        if (!response.ok) {
          throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
        }
        
        // Éxito
        this.showMessage(
          data.message || '¡Mensaje enviado con éxito! Te contactaré pronto.',
          'success'
        );
        
        // Reiniciar formulario después de éxito
        setTimeout(() => this.resetForm(), 100);
        
        // Registrar evento exitoso
        console.log('✅ Formulario enviado exitosamente:', {
          messageId: data.messageId,
          timestamp: new Date().toISOString(),
          recipient: data.recipient
        });
        
      } catch (error) {
        console.error('❌ Error completo al enviar:', error);
        
        let errorMessage = 'Error al enviar el mensaje. ';
        let errorType = 'error';
        
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('NetworkError') ||
            error.message.includes('Network request failed')) {
          errorMessage += 'No se pudo conectar con el servidor. ';
          errorMessage += 'Verifica tu conexión a internet o inténtalo más tarde.';
          errorType = 'error';
        } else if (error.message.includes('CORS') || 
                  error.message.includes('Origin')) {
          errorMessage += 'Error de configuración del servidor. ';
          errorMessage += 'Por favor, reporta este problema.';
          errorType = 'error';
        } else if (error.message.includes('404')) {
          errorMessage += 'La ruta no fue encontrada en el servidor.';
          errorType = 'error';
        } else if (error.message.includes('400')) {
          errorMessage += 'Datos inválidos enviados al servidor.';
          errorType = 'warning';
        } else if (error.message.includes('500') || 
                  error.message.includes('503')) {
          errorMessage += 'Error interno del servidor. ';
          errorMessage += 'Por favor, inténtalo más tarde.';
          errorType = 'warning';
        } else {
          errorMessage += error.message;
          errorType = 'error';
        }
        
        this.showMessage(errorMessage, errorType);
        
        // Intentar reconectar al backend
        this.checkBackendConnection();
        
      } finally {
        this.isLoading = false;
      }
    },
    
    scrollToFirstError() {
      const firstError = Object.keys(this.errors).find(key => this.errors[key]);
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
    },
    
    // ========== UTILIDADES ==========
    showMessage(text, type) {
      this.messageStatus = { text, type };
      
      // Auto-ocultar mensajes después de un tiempo
      if (type === 'success') {
        setTimeout(() => {
          if (this.messageStatus?.type === 'success') {
            this.messageStatus = null;
          }
        }, 5000);
      } else if (type === 'warning') {
        setTimeout(() => {
          if (this.messageStatus?.type === 'warning') {
            this.messageStatus = null;
          }
        }, 8000);
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      this.errors = { name: '', email: '', subject: '', message: '' };
      console.log('🧹 Formulario reiniciado');
    }
  },
  
  mounted() {
    // Marcar tiempo de creación para delays en mensajes
    this._createdAt = Date.now();
    
    // Verificar conexión periódicamente (cada 60 segundos)
    setInterval(() => {
      if (!this.isLoading) {
        this.checkBackendConnection();
      }
    }, 60000);
  }
};
</script>

<style scoped>
.contact {
  padding: 5rem 2rem;
  background: var(--jc-dark, #2c3e50);
  color: white;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.8rem;
  color: var(--jc-primary, #3498db);
  font-weight: 700;
}

.contact-description {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Mensajes de estado */
.status-message {
  max-width: 800px;
  margin: 1.5rem auto 2rem;
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  animation: slideDown 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.status-message.success {
  background: rgba(46, 204, 113, 0.15);
  border: 1.5px solid #2ecc71;
  color: #2ecc71;
}

.status-message.error {
  background: rgba(231, 76, 60, 0.15);
  border: 1.5px solid #e74c3c;
  color: #e74c3c;
}

.status-message.warning {
  background: rgba(241, 196, 15, 0.15);
  border: 1.5px solid #f1c40f;
  color: #f1c40f;
}

.status-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.status-text {
  flex: 1;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

/* Layout del contenido */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Información de contacto */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.15);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-details h3 {
  margin-bottom: 0.5rem;
  color: var(--jc-primary, #3498db);
  font-size: 1.2rem;
}

.contact-details p {
  opacity: 0.9;
  line-height: 1.5;
  font-size: 1rem;
}

/* Formulario */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .contact-form {
    padding: 1.5rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: #e74c3c;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 1rem 1.2rem;
  border: 2px solid #34495e;
  border-radius: 8px;
  background: #2c3e50;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  width: 100%;
}

.form-group input:hover,
.form-group textarea:hover {
  border-color: #4a6b8a;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--jc-primary, #3498db);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background: #34495e;
}

.form-group input.error-border,
.form-group textarea.error-border {
  border-color: #e74c3c;
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.char-counter {
  font-size: 0.8rem;
  color: #95a5a6;
}

.char-counter.warning {
  color: #f1c40f;
  font-weight: bold;
}

/* Botones */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  min-height: 55px;
  flex: 1;
}

.btn-primary {
  background: var(--jc-primary, #3498db);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn.disabled {
  background: #7f8c8d;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-note {
  font-size: 0.85rem;
  opacity: 0.7;
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 1.5;
}

/* Debug info */
.debug-info {
  margin-top: 2rem;
}

.debug-info summary {
  cursor: pointer;
  color: #95a5a6;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.debug-info summary:hover {
  background: rgba(255, 255, 255, 0.05);
}

.debug-content {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.debug-content p {
  margin: 0.5rem 0;
}

.btn-debug {
  background: #8e44ad;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.btn-debug:hover {
  background: #9b59b6;
}

/* Responsive adicional */
@media (max-width: 576px) {
  .contact {
    padding: 3rem 1rem;
  }
  
  .contact h2 {
    font-size: 2.2rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>