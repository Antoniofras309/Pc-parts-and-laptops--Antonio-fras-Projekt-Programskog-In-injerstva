<template>
  <div class="shop-container">

    <header class="shop-header">
      <h1>Ponuda: {{ categoryTitle }}</h1>
      <p class="subtitle">
        Podaci se povlače uživo sa stranice Vacom.hr
      </p>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Učitavam proizvode s Vacom.hr, molimo pričekajte...</p>
    </div>

    <div v-else class="products-grid">

      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >

        <div class="product-image">
          <img
            :src="product.image"
            :alt="product.name"
            loading="lazy"
          />
        </div>

        <div class="product-info">
          <h3
            class="product-name"
            :title="product.name"
          >
            {{ product.name }}
          </h3>

          <div class="product-price">
            {{ product.price }}
          </div>
        </div>

        <div class="product-actions">
          <button
            @click="addToCart(product)"
            class="btn-add-to-cart"
          >
            Dodaj u košaricu
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const products = ref([])
const loading = ref(false)

const currentCategory = computed(() => route.params.category)

const categoryTitle = computed(() => {
  return currentCategory.value === 'laptopovi'
    ? 'Laptopi'
    : 'PC Komponente'
})

const fetchProducts = async () => {
  loading.value = true
  products.value = []

  try {

    const vacomPath =
      currentCategory.value === 'laptopovi'
        ? 'kategorija-proizvoda/prijenosna-racunala/laptopi'
        : 'kategorija-proizvoda/racunala-i-it-oprema/komponente'

    // ISPRAVLJENO
    const ciljaniUrl = `https://vacom.hr/${vacomPath}`

    // ISPRAVLJENO
    const proxyUrl =
      `https://api.allorigins.win/raw?url=${encodeURIComponent(ciljaniUrl)}`

    const response = await fetch(proxyUrl)

    if (!response.ok) {
      throw new Error(`HTTP greška: ${response.status}`)
    }

    const htmlString = await response.text()

    const parser = new DOMParser()

    const doc = parser.parseFromString(
      htmlString,
      'text/html'
    )

    const productElements = doc.querySelectorAll(
      '.product, [class*="product-card"], .ast-article-single'
    )

    const tempProducts = []

    productElements.forEach((el) => {

      const nameEl = el.querySelector(
        'h2, h3, .woocommerce-loop-product__title'
      )

      const priceEl = el.querySelector(
        '.price, .amount'
      )

      const imgEl = el.querySelector('img')

      if (nameEl && priceEl) {

        const cistaCijena =
          priceEl.innerText
            .trim()
            .replace(/\s+/g, ' ')

        tempProducts.push({
          id: Math.random()
            .toString(36)
            .substring(2, 11),

          name: nameEl.innerText.trim(),

          price: cistaCijena,

          image: imgEl
            ? (
                imgEl.getAttribute('data-lazy-src') ||
                imgEl.getAttribute('src')
              )
            : 'https://via.placeholder.com/300'
        })

      }

    })

    /*
     * Ako ne pronađemo proizvode,
     * koristimo testne podatke.
     */

    if (tempProducts.length === 0) {

      if (currentCategory.value === 'laptopovi') {

        products.value = [
          {
            id: 'l1',
            name: 'Laptop HP 255R G10',
            price: '449,99 €',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 'l2',
            name: 'Laptop Lenovo IdeaPad Slim 3',
            price: '479,99 €',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 'l3',
            name: 'Laptop Asus TUF Gaming',
            price: '989,99 €',
            image: 'https://via.placeholder.com/300'
          }
        ]

      } else {

        products.value = [
          {
            id: 'k1',
            name: 'AMD Ryzen 5 5500',
            price: '99,00 €',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 'k2',
            name: 'NVIDIA GeForce RTX 3050',
            price: '219,00 €',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 'k3',
            name: 'AMD Ryzen 7',
            price: '249,00 €',
            image: 'https://via.placeholder.com/300'
          }
        ]

      }

    } else {

      products.value = tempProducts

    }

  } catch (error) {

    console.error(
      'Greška pri dohvaćanju s Vacom.hr:',
      error
    )

    /*
     * Ako Vacom nije dostupan,
     * prikaži testne proizvode.
     */

    products.value = [
      {
        id: 'test1',
        name: 'Test proizvod',
        price: '99,99 €',
        image: 'https://via.placeholder.com/300'
      }
    ]

  } finally {

    loading.value = false

  }
}


const addToCart = (product) => {

  const existingCart =
    JSON.parse(
      localStorage.getItem('web_shop_cart')
    ) || []

  existingCart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })

  localStorage.setItem(
    'web_shop_cart',
    JSON.stringify(existingCart)
  )

  alert(
    `Proizvod "${product.name}" je dodan u košaricu!`
  )
}


onMounted(fetchProducts)

watch(
  currentCategory,
  () => {
    fetchProducts()
  }
)
</script>


<style scoped>

.shop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.shop-header {
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  color: #666;
  font-style: italic;
}

.loading-state {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  );
  gap: 25px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-info {
  flex-grow: 1;
  margin-bottom: 15px;
}

.product-name {
  font-size: 16px;
  margin: 0 0 10px 0;
  color: #333;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  height: 44px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.btn-add-to-cart {
  width: 100%;
  padding: 10px;

  background-color: #2ecc71;
  color: white;

  border: none;
  border-radius: 5px;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;

  transition: background-color 0.2s;
}

.btn-add-to-cart:hover {
  background-color: #27ae60;
}

</style>
