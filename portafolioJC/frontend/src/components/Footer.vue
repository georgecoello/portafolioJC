<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <h3>{{ name }}</h3>
          <p>{{ description }}</p>
        </div>
        <div class="footer-links">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/projects">Proyectos</router-link></li>
            <li><router-link to="/about">Sobre Mí</router-link></li>
          </ul>
        </div>
        <div class="footer-social">
          <h4>Conecta conmigo</h4>
          <div class="social-links">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" class="social-link">
              {{ social.name }}
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ name }}. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      name: 'Jorge Isaac Coello Berrios',
      description: 'Soy un desarrollador web comprometido con ayudar a su empresa a poder alcanzar cada uno de sus metas y objetivos, con la intención de querer marcar la diferencia y alcanzar el éxito en sus proyectos.',
      socialLinks: [
        { name: 'GitHub', url: 'https://github.com/georgecoello' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jorge-isaac-coello-berrios-947526237/' }
      ]
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--jc-dark);
  color: var(--jc-on-dark);
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-info h3 {
  margin-bottom: 1rem;
  color: var(--jc-blue);
}

.footer-links h4,
.footer-social h4 {
  margin-bottom: 1rem;
  color: var(--jc-blue);
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: var(--jc-on-dark);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--jc-blue);
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  background: var(--jc-dark-2);
  color: var(--jc-on-dark);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;
}

.social-link:hover {
  background: var(--jc-blue);
}

.footer-bottom {
  border-top: 1px solid var(--jc-dark-2);
  padding-top: 1rem;
  text-align: center;
  color: var(--jc-on-dark);
}
</style>