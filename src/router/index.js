import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import BooksView from '../views/Books.vue'
import BookDetails from '../views/BookDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/books/:id',
      name: 'book-details',
      component: BookDetails,
    },
  ],
})

export default router
