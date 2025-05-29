<template>
  <div class="container mt-4">
    <h2>Motorok</h2>
    <div class="row">
      <div v-for="motor in motors" :key="motor.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="motor.image" class="card-img-top" :alt="motor.brand" />
          <div class="card-body">
            <h5 class="card-title">{{ motor.brand }}</h5>
            <button @click="showDetails(motor.id)" class="btn btn-primary">Részletek</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Motors',
  setup() {
    const motors = ref([])

    const fetchMotors = async () => {
      try {
        const response = await fetch('http://localhost:3000/motorcycles')
        motors.value = await response.json()
      } catch (error) {
        console.error('Hiba a motorok betöltésekor:', error)
      }
    }

    const showDetails = (id) => {
      console.log('Kiválasztott motor ID:', id)
    }

    onMounted(() => {
      fetchMotors()
    })

    return {
      motors,
      showDetails,
    }
  },
}
</script>
