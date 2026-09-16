<template>
  <div class="newsletter-box">
    <h3>Prijavite se na naš Newsletter</h3>

    <form @submit.prevent="handleSubscribe">
      <input
        v-model="email"
        type="email"
        placeholder="Vaša e-mail adresa"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Prijava...' : 'Prijavi se' }}
      </button>
    </form>

    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const email = ref('');
const loading = ref(false);
const message = ref('');
const isSuccess = ref(true);

const handleSubscribe = async () => {
  loading.value = true;
  message.value = '';

  try {
    await addDoc(collection(db, 'newsletter'), {
      email: email.value,
      subscribedAt: serverTimestamp()
    });

    isSuccess.value = true;
    message.value = 'Uspješno ste se prijavili na newsletter!';
    email.value = '';
  } catch (error) {
    console.error('Greška pri spremanju:', error);

    isSuccess.value = false;
    message.value = 'Došlo je do greške. Pokušajte ponovno.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.success {
  color: green;
}

.error {
  color: red;
}
</style>
```
