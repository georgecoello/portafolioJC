<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h1>{{ name }}</h1>
      </div>
      <ul class="nav-links">
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
      name: 'Tu Nombre'
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

.nav-brand h1 {
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: var(--jc-on-dark);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--jc-blue);
}

.nav-links a.router-link-active {
  color: var(--jc-blue);
  font-weight: bold;
}
</style>