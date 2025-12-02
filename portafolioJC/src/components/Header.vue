<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <img src="/logo.png" alt="logo" class="brand-logo" />
        <h1 class="brand-name">{{ name }}</h1>
      </div>

      <button class="menu-toggle md:hidden" @click="isOpen = !isOpen" :aria-expanded="isOpen" aria-label="Toggle menu">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <ul :class="['nav-links', { open: isOpen }, 'md:flex']">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/projects">Proyectos</router-link></li>
        <li><router-link to="/about">Sobre Mí</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      name: 'Jorge Coello',
      isOpen: false
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--jc-dark);
  color: var(--jc-on-dark);
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
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  flex-shrink: 0;
}

.brand-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--jc-on-dark);
}

.menu-toggle {
  background: transparent;
  border: none;
  color: var(--jc-on-dark);
}

.menu-toggle svg {
  width: 24px;
  height: 24px;
  stroke: var(--jc-on-dark);
}

.nav-links {
  display: none;
  list-style: none;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-links a {
  color: var(--jc-on-dark);
  text-decoration: none;
  transition: color 0.3s;
}

/* Mobile overlay when menu is open */
.nav-links.open {
  display: flex;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34,48,68,0.98);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.5rem;
  gap: 1rem;
  z-index: 1500;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.nav-links.open li {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-links.open li a {
  font-size: 1.125rem;
  padding: 0.75rem 1rem;
  width: 90%;
  max-width: 420px;
  text-align: center;
  border-radius: 8px;
  background: transparent;
  color: var(--jc-on-dark);
}

.nav-links.open li a:hover {
  background: rgba(255,255,255,0.04);
  color: var(--jc-blue);
}

.nav-links a:hover {
  color: var(--jc-blue);
}

.nav-links a.router-link-active {
  color: var(--jc-blue);
  font-weight: bold;
}
</style>