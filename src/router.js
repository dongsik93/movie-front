import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
			path: '/',
			name: 'Login',
			component: LoginPage
		},
    {
      path: '/home',
      name : 'Home',
      component : HomePage,
    },
  ]
})
