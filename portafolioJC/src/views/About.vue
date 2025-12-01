<template>
  <div class="about-page">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h1>Sobre Mí</h1>
          <p>{{ bio }}</p>
          
          <div class="skills-section">
            <h2>Tecnologías y Herramientas</h2>
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.category" class="skill-category">
                <h3>{{ skill.category }}</h3>
                <div class="skill-items">
                  <span v-for="item in skill.items" :key="item" class="skill-item">
                    {{ item }}
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
      skills: [
        {
          category: 'Frontend',
          items: ['Vue.js', 'React', 'JavaScript',  'HTML5', 'Bootstrap', 'Tailwind CSS']
        },
        {
          category: 'Backend',
          items: ['Node.js', 'Python', 'PHP', 'MySQL', 'Postman', 'SQLite', 'SQL Developer']
        },
        {
          category: 'Herramientas',
          items: ['Github', 'Vite', 'Figma', 'VS Code', 'Tableau', 'Canva', 'Microsoft Office', 'Django', 'Ubuntu', 'Windows' ]
        }
      ]
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
  margin-bottom: 3rem;
  color: var(--jc-muted);
  font-size: 1.1rem;
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
  background: var(--jc-bg);
  color: var(--jc-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.about-image {
  text-align: center;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-page {
    padding: 100px 1rem 1rem;
  }
}
</style>