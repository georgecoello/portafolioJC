<template>
  <div class="projects-page">
    <div class="container">
      <h1>Mis Proyectos</h1>
      <p class="page-description">Una colección de proyectos que he desarrollado.</p>
      
      <div class="filters">
        <button 
          v-for="filter in filters" 
          :key="filter"
          :class="['filter-btn', { active: activeFilter === filter }]"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <div class="projects-grid">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: projects,
      activeFilter: 'Todos',
      filters: ['Todos', 'Vue.js', 'HTML5', 'JavaScript', 'MySQL', 'PHP' ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'Todos') {
        return this.projects
      }
      return this.projects.filter(project => 
        project.technologies.includes(this.activeFilter)
      )
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding: 100px 2rem 2rem;
  min-height: 100vh;
  background: var(--jc-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.projects-page h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--jc-text);
  font-size: 2.5rem;
}

.page-description {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--jc-text-skill);
  font-size: 1.2rem;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--jc-blue);
  background: var(--jc-surface);
  color: var(--jc-text-skill);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.filter-btn:hover {
  background: var(--jc-blue);
  color: var(--jc-text-skill);
}

.filter-btn.active {
  background: var(--jc-blue);
  color: var(--jc-text-skill);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 100px 1rem 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>