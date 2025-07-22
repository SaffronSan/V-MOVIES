import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesDetailsView from '../views/MoviesDetailsView.vue'
import SearchHistory from "../views/SearchHistory.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/Moviesdetails/:id",
      component: MoviesDetailsView
    },
    {
      path: "/History",
      component: SearchHistory
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    document.title = 'Home';
  }
  if(to.path === "/History"){
    document.title = 'History';
  }
  next();
});
export default router
