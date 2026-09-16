<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="signup-box">
        <h3>Signup</h3>

        <form @submit.prevent="signup">
          <div class="form-group mb-3">
            <label>Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Unesite email"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Unesite lozinku"
              required
            />
          </div>

          <div class="my-3">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Registracija...' : 'Signup' }}
            </button>
          </div>
        </form>

        <p v-if="message" :class="messageType">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')

const signup = async () => {
  loading.value = true
  message.value = ''

  try {
    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    message.value = 'Registracija je uspješna!'
    messageType.value = 'success'

    email.value = ''
    password.value = ''
  } catch (error) {
    console.error('Greška pri registraciji:', error)

    if (error.code === 'auth/email-already-in-use') {
      message.value = 'Ovaj email je već registriran.'
    } else if (error.code === 'auth/invalid-email') {
      message.value = 'Email adresa nije ispravna.'
    } else if (error.code === 'auth/weak-password') {
      message.value = 'Lozinka mora imati najmanje 6 znakova.'
    } else {
      message.value = 'Došlo je do greške pri registraciji.'
    }

    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-box {
  margin-top: 40px;
}

.signup-box h3 {
  margin-bottom: 25px;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>