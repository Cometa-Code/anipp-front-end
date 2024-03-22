import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/:pathMatch(.*)*', redirect: '/acessar' },
  {
    path: '/acessar',
    name: 'Acessar',
    component: LoginView
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: DashboardView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = `${to.name} - ANIPP` || 'ANIPP';
  next();
});

export default router
