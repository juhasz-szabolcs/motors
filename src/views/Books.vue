<template>
  <div class="container mt-4">
    <h2>Könyvek</h2>
    <div class="row">
      <div v-for="book in books" :key="book.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="book.cover" class="card-img-top" :alt="book.title" />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.author }}</p>
            <router-link :to="`/books/${book.id}`" class="btn btn-primary">Részletek</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Books',
  setup() {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books')
        books.value = await response.json()
      } catch (error) {
        console.error('Hiba a könyvek betöltésekor:', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books
    }
  },
}
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style> 