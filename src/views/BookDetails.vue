<template>
  <div class="container mt-5 bg-white p-4 rounded">
    <div class="row">
      <div class="col-md-3 d-flex align-items-start justify-content-center">
        <img :src="book.cover" :alt="book.title" class="img-fluid rounded shadow" style="max-height: 350px;" />
      </div>
      <div class="col-md-9">
        <h2 class="mb-0">{{ book.title }}</h2>
        <h5 class="text-muted mb-3">{{ book.author }}</h5>
        <div class="card mb-3">
          <div class="card-body py-2">
            <strong>Könyv adatai</strong>
            <div class="row mt-2">
              <div class="col-sm-6"><b>Azonosító:</b> {{ book.id }}</div>
              <div class="col-sm-6"><b>ISBN:</b> {{ book.isbn || 'N/A' }}</div>
            </div>
          </div>
        </div>
        <h5>Leírás</h5>
        <p>{{ book.description }}</p>
        <h5>Értékelések</h5>
        <div class="mb-2">
          <div class="progress" style="height: 24px;">
            <div class="progress-bar bg-success" role="progressbar" :style="{ width: ratingPercent + '%' }">
              {{ book.rating ? book.rating + '/5' : 'Nincs értékelés' }}
            </div>
          </div>
        </div>
        <small class="text-muted">Több mint 10 millió olvasó értékelése alapján</small>
        <div class="mt-4">
          <router-link to="/books" class="btn btn-secondary me-2">Vissza a könyvekhez</router-link>
          <button class="btn btn-primary">Kosárba tesz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BookDetails',
  setup() {
    const route = useRoute()
    const book = ref({})
    const ratingPercent = ref(0)

    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${route.params.id}`)
        book.value = await response.json()
        ratingPercent.value = book.value.rating ? (book.value.rating / 5) * 100 : 0
      } catch (error) {
        console.error('Hiba a könyv betöltésekor:', error)
      }
    }

    onMounted(() => {
      fetchBook()
    })

    return {
      book,
      ratingPercent
    }
  },
}
</script>

<style scoped>
.progress {
  background-color: #e9ecef;
}
.progress-bar {
  font-weight: bold;
  font-size: 1rem;
}
</style> 