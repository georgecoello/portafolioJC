<template>
  <div class="about-page">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h1>Sobre Mí</h1>
          <p>{{ bio }}</p>
          
          <!-- Botón de descarga de CV -->
          <div class="cv-download-section">
            <button @click="downloadCV" class="download-btn">
              <i class="fas fa-download"></i>
              <span>Descargar CV (PDF)</span>
            </button>
            <p class="cv-note">Descarga mi currículum actualizado</p>
          </div>
          
          <div class="skills-section">
            <h2>Tecnologías y Herramientas</h2>
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.category" class="skill-category">
                <h3>{{ skill.category }}</h3>
                <div class="skill-items">
                  <span v-for="(item, idx) in skill.items" :key="skill.category + '-' + idx" class="skill-item">
                    <template v-if="item && typeof item === 'object' && item.img">
                      <img :src="item.img" :alt="item.name || 'icon'" class="skill-icon" loading="lazy" />
                      <span class="skill-name">{{ item.name }}</span>
                    </template>
                    <template v-else>
                      {{ typeof item === 'string' ? item : (item && item.name) }}
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-image">
          <img src="/images/profile.jpg" alt="Foto de perfil" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      bio: 'Soy un desarrollador web comprometido con ayudar a su empresa a poder alcanzar cada uno de sus metas y objetivos, con la intención de querer marcar la diferencia y alcanzar el éxito en sus proyectos.',
      cvFileName: 'CV_Jorge_Coello.pdf', // Nombre del archivo PDF
      cvPath: '/CV_JorgeCoello.pdf', // Ruta donde está el PDF en tu proyecto
      skills: [
        {
          category: 'Frontend',
          items: [
            { img: '/vue-logo.svg' },
            { img: '/javascript.svg' },
            { img: '/html-5.svg' },
            { img: '/css3.svg' },
            { img: '/bootstrap.svg' },
            { img: '/tailwind.svg' }
          ]
        },
        {
          category: 'Backend',
          items: [
            { img: '/nodejs.svg' },
            { img: '/python.svg' },
            { img: '/php.svg' },
            { img: '/postman.svg' },
            { img: '/mysql.svg' },
            { img: '/sql.svg' }
          ]
        },
        {
          category: 'Herramientas',
          items: [
            { img: '/github.svg' },
            { img: '/figma.svg' },
            { img: '/vscode.svg' },
            { img: '/tableau.svg' },
            { img: '/canva.svg' }
          ]
        }
      ]
    }
  },
  methods: {
    downloadCV() {
      try {
        // Crear un enlace temporal
        const link = document.createElement('a');
        link.href = this.cvPath;
        link.download = this.cvFileName;
        
        // Simular clic en el enlace
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Opcional: Mostrar mensaje de éxito
        this.showDownloadMessage();
        
      } catch (error) {
        this.showErrorMessage();
      }
    },
    
    showDownloadMessage() {
      // Puedes usar un toast o alerta aquí
      alert('Descarga iniciada. Si no se descarga, verifica que el archivo esté en la carpeta correcta.');
      
      // O crear un mensaje en la interfaz
      const message = document.createElement('div');
      message.className = 'download-message';
      message.textContent = '¡Descarga iniciada!';
      message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--jc-blue);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: fadeInOut 3s ease;
      `;
      
      document.body.appendChild(message);
      
      setTimeout(() => {
        if (message.parentNode) {
          document.body.removeChild(message);
        }
      }, 3000);
    },
    
    showErrorMessage() {
      alert('No se pudo descargar el CV. Asegúrate de que el archivo esté en la carpeta "public/cv/" con el nombre correcto.');
    },
    
    // Método alternativo usando fetch (si el PDF está en servidor)
    async downloadCVWithFetch() {
      try {
        const response = await fetch(this.cvPath);
        
        if (!response.ok) {
          throw new Error('Archivo no encontrado');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = this.cvFileName;
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        this.showDownloadMessage();
        
      } catch (error) {
        this.showErrorMessage();
      }
    }
  }
}
</script>

<style scoped>
.about-page {
  padding: 100px 2rem 2rem;
  min-height: 100vh;
  background: var(--jc-surface);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text h1 {
  color: var(--jc-text);
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.about-text p {
  line-height: 1.8;
  margin-bottom: 2rem;
  color: var(--jc-text-skill);
  font-size: 1.1rem;
}

/* Sección de descarga de CV */
.cv-download-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1));
  border-radius: 12px;
  border-left: 4px solid var(--jc-blue);
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--jc-blue), var(--jc-indigo));
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  background: linear-gradient(135deg, var(--jc-indigo), var(--jc-blue));
}

.download-btn:active {
  transform: translateY(0);
}

.download-btn i {
  font-size: 1.1rem;
}

.cv-note {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--jc-muted);
  opacity: 0.9;
}

.skills-section h2 {
  color: var(--jc-text);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.skills-grid {
  display: grid;
  gap: 2rem;
}

.skill-category h3 {
  color: var(--jc-blue);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  display: inline-flex;
  align-items: center;
  background: var(--jc-21221);
  color: var(--jc-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: transform 0.2s ease, background 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
  background: rgba(37, 99, 235, 0.1);
}

.skill-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-right: 0.5rem;
}

.skill-name {
  vertical-align: middle;
}

.about-image {
  text-align: center;
  position: sticky;
  top: 100px;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-image img:hover {
  transform: translateY(-5px);
}

/* Animación para mensajes */
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  15% {
    opacity: 1;
    transform: translateX(0);
  }
  85% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-page {
    padding: 100px 1rem 1rem;
  }
  
  .about-image {
    position: static;
    order: -1;
  }
  
  .download-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .download-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
  
  .cv-download-section {
    padding: 1.25rem;
  }
}
</style>