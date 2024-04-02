import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/pages/HomeView.vue'
import RecoverPasswordView from '../views/RecoverPasswordView.vue'

const routes = [
  { path: '/:pathMatch(.*)*', redirect: '/acessar' },
  {
    path: '/acessar',
    name: 'Acessar',
    component: LoginView
  },
  {
    path: '/',
    component: DashboardView,
    children: [
      {
        path: '/inicio',
        name: 'Página Inicial',
        component: HomeView
      }
    ]
  },
  {
    path: '/recuperar-senha',
    name: 'Recuperar Senha',
    component: RecoverPasswordView
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
