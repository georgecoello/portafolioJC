<template>
  <section class="contact" id="contact">
    <div class="container">
      <h2>Contacto</h2>
      <p class="contact-description">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>{{ email }}</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <div>
              <h3>Teléfono</h3>
              <p>{{ phone }}</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h3>Ubicación</h3>
              <p>{{ location }}</p>
            </div>
          </div>
        </div>
        
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="subject">Asunto</label>
            <input type="text" id="subject" v-model="form.subject" required>
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: 'tu.email@ejemplo.com',
      phone: '+1 234 567 890',
      location: 'Ciudad, País',
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Aquí puedes integrar con un servicio de email o API
      console.log('Formulario enviado:', this.form)
      alert('¡Mensaje enviado! Te contactaré pronto.')
      
      // Reset form
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 4rem 2rem;
  background: var(--jc-dark);
  color: var(--jc-on-dark);
}

.contact h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.contact-description {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--jc-blue);
  width: 40px;
}

.contact-item h3 {
  margin-bottom: 0.5rem;
  color: var(--jc-blue);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: var(--jc-dark-2);
  color: var(--jc-on-dark);
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid var(--jc-blue);
}

.btn-primary {
  background: var(--jc-blue);
  color: var(--jc-surface);
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: var(--jc-indigo);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>