<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
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
      name: 'Tu Nombre',
      title: 'Desarrollador Full Stack',
      description: 'Apasionado por crear soluciones web innovadoras y eficientes.',
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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