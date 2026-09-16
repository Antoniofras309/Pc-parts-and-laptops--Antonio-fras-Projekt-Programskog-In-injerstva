<template>
  <div class="cart-container">
    <h1>Vaša košarica</h1>

    <!-- Ako je košarica prazna -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Vaša košarica je trenutno prazna.</p>
      <!-- Link koji vraća korisnika natrag na shop  -->
      <router-link to="/shop/laptopovi" class="btn-continue">Natrag na trgovinu</router-link>
    </div>

    <!-- Ako u košarici ima proizvoda -->
    <div v-else class="cart-content">
      <div class="cart-items-list">
        <div v-for="(item, index) in cartItems" :key="item.id + '-' + index" class="cart-item">
          
          <img :src="item.image" :alt="item.name" class="item-img" />
          
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ item.price }}</p>
          </div>
          
          <button @click="removeFromCart(index)" class="btn-remove" title="Ukloni proizvod">
            Ukloni
          </button>
          
        </div>
      </div>

      <!-- Sažetak kupnje -->
      <div class="cart-summary">
        <h3>Pregled narudžbe</h3>
        <p class="total-items">Ukupno artikala: <strong>{{ cartItems.length }}</strong></p>
        <button @click="checkout" class="btn-checkout">Završi kupnju</button>
        <button @click="clearCart" class="btn-clear">Isprazni košaricu</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cartItems = ref([])

// Učita proizvode iz LocalStorage
const loadCart = () => {
  const savedCart = localStorage.getItem('web_shop_cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  } else {
    cartItems.value = []
  }
}

// Uklona specifičnog artikla
const removeFromCart = (index) => {
  cartItems.value.splice(index, 1) // Briše 1 element na poziciji index
  localStorage.setItem('web_shop_cart', JSON.stringify(cartItems.value)) // Sprema novo stanje
}

// Potpuno pražnjenje košarice
const clearCart = () => {
  if (confirm("Jeste li sigurni da želite isprazniti cijelu košaricu?")) {
    cartItems.value = []
    localStorage.removeItem('web_shop_cart')
  }
}

// Simulacija završetka kupnje
const checkout = () => {
  alert("Hvala vam na narudžbi! Ova funkcionalnost se spaja na naplatni sustav.")
  cartItems.value = []
  localStorage.removeItem('web_shop_cart')
}

// Pokreni učitavanje pri pokretanju komponente
onMounted(loadCart)
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
  color: #666;
}

.btn-continue {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  background: white;
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #333;
}

.item-price {
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
  margin: 0;
}

.btn-remove {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn-remove:hover {
  background-color: #cc0000;
}

.cart-summary {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  height: fit-content;
}

.cart-summary h3 {
  margin-top: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.total-items {
  font-size: 16px;
  margin: 20px 0;
}

.btn-checkout {
  width: 100%;
  padding: 12px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-checkout:hover {
  background-color: #27ae60;
}

.btn-clear {
  width: 100%;
  padding: 8px;
  background-color: transparent;
  color: #777;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.btn-clear:hover {
  background-color: #eee;
  color: #333;
}
</style>

<script>
export default {};
</script>