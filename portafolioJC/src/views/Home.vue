<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content mx-auto max-w-4xl px-4">
        <h1>Hola, soy {{ name }}</h1>
        <p class="title">{{ title }}</p>
        <p class="description">{{ description }}</p>
        <div class="hero-buttons">
          <router-link to="/projects" class="btn btn-primary">Ver Proyectos</router-link>
          <a href="#contact" class="btn btn-secondary">Contactar</a>
        </div>
      </div>
    </section>

    <section class="featured-projects">
      <div class="container">
        <h2>Proyectos Destacados</h2>
        <div class="projects-grid">
          <ProjectCard 
            v-for="project in featuredProjects" 
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <Skills />
    <Contact />
  </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue'
import Skills from '../components/Skills.vue'
import Contact from '../components/Contact.vue'
import { projects } from '../data/projects.js'

export default {
  name: 'Home',
  components: {
    ProjectCard,
    Skills,
    Contact
  },
  data() {
    return {
      name: 'Jorge Isaac Coello Berrios',
      title: 'Frontend Developer & Diseñador UI/UX',
      description: 'Soy un desarrollador web comprometido con ayudar a su empresa a poder alcanzar cada uno de sus metas y objetivos, con la intención de querer marcar la diferencia y alcanzar el éxito en sus proyectos. Me especializo en crear experiencias digitales atractivas y funcionales utilizando las últimas tecnologías como Vue.js, React y Node.js. Estoy apasionado por el diseño centrado en el usuario y siempre busco mejorar mis habilidades para ofrecer soluciones innovadoras.\nAdemás, de trabajar en este tipo de proyectos, me gusta mantenerme relajado escuchando música, practicando guitarra y ukelele, y me desempeño como lider de jóvenes en mi iglesia, lo cual me permite desarrollar habilidades de liderazgo y trabajo en equipo.',
      featuredProjects: projects.filter(project => project.featured).slice(0, 3)
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 80px;
}

.hero {
  background: var(--jc-gradient);
  color: var(--jc-on-dark);
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: justify !important;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
    max-width: 100%;
  }
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background: white;
  color: var(--jc-indigo);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: translateY(-2px);
}

.featured-projects {
  padding: 4rem 2rem;
  background: var(--jc-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.featured-projects h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--jc-text);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
</style>