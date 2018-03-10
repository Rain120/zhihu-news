import Vue from 'vue'
import Router from 'vue-router'

const HomePage = (resolve) => {
    import('components/home-page/home-page').then((moudle) => {
      resolve(moudle)
    })
}

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: HomePage
  }]
})
