<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h1>{{ name }}</h1>
      </div>
      
      <!-- Botón hamburguesa para móviles -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger" :class="{ 'active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Menú de navegación -->
      <ul class="nav-links" :class="{ 'active': isMenuOpen }">
        <li><router-link to="/" @click="closeMenu">Inicio</router-link></li>
        <li><router-link to="/projects" @click="closeMenu">Proyectos</router-link></li>
        <li><router-link to="/about" @click="closeMenu">Sobre Mí</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      name: 'Jorge Isaac Coello Berrios',
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
  },
  mounted() {
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.isMenuOpen = false
      }
    })
    
    // Cerrar menú al cambiar de ruta
    this.$router.afterEach(() => {
      this.isMenuOpen = false
    })
  }
}
</script>

<style scoped>
.header {
  background: var(--jc-dark);
  color: white;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: relative;
}

.nav-brand h1 {
  font-size: 1.5rem;
  margin: 0;
}

/* Botón hamburguesa - Solo visible en móviles */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger {
  display: block;
  position: relative;
  width: 24px;
  height: 18px;
}

.hamburger span {
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 8px;
}

.hamburger span:nth-child(3) {
  top: 16px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg);
  top: 8px;
}

/* Menú de navegación */
.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s;
  position: relative;
}

.nav-links a:hover {
  color: var(--jc-primary);
}

.nav-links a.router-link-active {
  color: var(--jc-primary);
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--jc-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    padding: 0 1rem;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: var(--jc-dark);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-links li {
    width: 100%;
    text-align: center;
  }
  
  .nav-links a {
    display: block;
    padding: 1rem;
    width: 100%;
  }
  
  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .nav-links a.router-link-active::after {
    display: none;
  }
  
  .nav-links a.router-link-active {
    background: rgba(52, 152, 219, 0.1);
  }
}

@media (min-width: 769px) {
  .nav-links {
    display: flex !important;
  }
}
</style>