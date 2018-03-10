import Vue from 'vue'
import Router from 'vue-router'

const HomePage = (resolve) => {
    import('components/home-page/home-page').then((moudle) => {
      resolve(moudle)
    })
}

const NewsPage = (resolve) => {
    import('components/news-page/news-page').then((moudle) => {
      resolve(moudle)
    })
}

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/news-page/:id',
    name: 'newsPage',
    component: NewsPage
  }
  ]
})
