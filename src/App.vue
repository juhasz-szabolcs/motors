<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<template>
  <div>
    <Navbar />
    <div class="main-content-wrapper d-flex justify-content-center align-items-start py-4" style="min-height:80vh;">
      <div class="main-content bg-white rounded shadow p-4 w-100" style="max-width:1200px;">
        <router-view />
      </div>
    </div>
  </div>
</template>
