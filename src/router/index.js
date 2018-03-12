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

const ThemePage = (resolve) => {
  import('components/theme-page/theme-page').then((moudle) => {
    resolve(moudle)
  })
}

const EditorsList = (resolve) => {
  import('components/editors-list/editors-list').then((moudle) => {
    resolve(moudle)
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/news-page/:id',
      name: 'newsPage',
      component: NewsPage
    },
    {
      path: '/theme-page/:id',
      name: 'themePage',
      component: ThemePage
    },
    {
      path: '/editorsList/:id',
      name: 'editorsList',
      component: EditorsList
    }
  ]
})
