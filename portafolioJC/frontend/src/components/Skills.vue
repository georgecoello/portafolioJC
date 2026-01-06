<template>
  <section class="skills" id="skills">
    <div class="container">
      <h2>Habilidades Técnicas</h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-icon">
            <i :class="skill.icon"></i>
          </div>
          <h3>{{ skill.name }}</h3>
          <p>{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      skills: [
        {
          name: 'Frontend Development',
          description: 'Vue.js, React, JavaScript, HTML5, Bootstrap, Tailwind CSS, Django',
          icon: 'fas fa-code'
        },
        {
          name: 'Backend Development',
          description: 'Node.js, Python, PHP, Postman, SQL, MySQL, SQLite, SQL Developer',
          icon: 'fas fa-server'
        },
        {
          name: 'UI/UX Design',
          description: 'Diseño responsive, Experiencia de usuario, Figma',
          icon: 'fas fa-palette'
        },
        {
          name: 'Herramientas y Tecnologías',
          description: 'Github, Figma, VS Code, Tableau, Canva, Microsoft Office, Ubuntu',
          icon: 'fas fa-cloud'
        }
      ]
    }
  }
}
</script>

<style scoped>
.skills {
  padding: 4rem 2rem;
  background: var(--jc-surface);
}

.skills h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--jc-text);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.skill-item {
  text-align: center;
  padding: 2rem;
  background: var(--jc-bg);
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  font-size: 3rem;
  color: var(--jc-blue);
  margin-bottom: 1rem;
}

.skill-item h3 {
  margin-bottom: 1rem;
  color: var(--jc-text);
}

.skill-item p {
  color: var(--jc-text-skill);
  line-height: 1.6;
}
</style>