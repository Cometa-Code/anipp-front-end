import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/pages/HomeView.vue'
import UserProfileView from '../views/pages/UserProfileView.vue'
import SeeAssociatesView from '../views/pages/SeeAssociatesView.vue'
import FinancialLifeView from '../views/pages/FinancialLifeView.vue'
import AssociateFinancialLifeView from '../views/pages/AssociateFinancialLifeView.vue'
import RecoverPasswordView from '../views/RecoverPasswordView.vue'
import ManageReportsView from '@/views/pages/ManageReportsView.vue'
import ReportsView from '@/views/pages/ReportsView.vue'
import CashFlowView from '@/views/pages/CashFlowView.vue'

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
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: UserProfileView
      },
      {
        path: '/associados',
        name: 'Associados',
        component: SeeAssociatesView
      },
      {
        path: '/vida-financeira',
        name: 'Vida Financeira',
        component: FinancialLifeView
      },
      {
        path: '/vida-financeira/:id',
        name: 'Vida Financeira do Associado',
        component: AssociateFinancialLifeView
      },
      {
        path: '/gerenciar-informes',
        name: 'Gerenciar Informes',
        component: ManageReportsView
      },
      {
        path: '/informes',
        name: 'Ver Informes',
        component: ReportsView
      },
      {
        path: '/fluxo-de-caixa',
        name: 'Fluxo de Caixa',
        component: CashFlowView
      },
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
  if (to.fullPath === "/") {
    next('/acessar');
  }

  document.title = `${to.name} - ANIPP` || 'ANIPP';
  next();
});

export default router
