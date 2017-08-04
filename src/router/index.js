import Vue      from 'vue'
import Router   from 'vue-router'
import Archive  from '../components/frontend/Archive.vue'
import Article  from '../components/frontend/Article.vue'
import Console  from '../components/backend/Console.vue'
import Login    from '../components/backend/Login.vue'
import Sign_up  from '../components/backend/Sign_up.vue'
import Articles from '../components/backend/Articles.vue'
import Editor   from '../components/backend/Editor.vue'
import Links    from '../components/backend/Links.vue'
import Account  from '../components/backend/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/archive', name: 'archive', component: Archive},
    {path: '/article', name: 'article', component: Article},
    {path: '/Sign_up', name: 'Sign_up', component: Sign_up},
    {path: '/', component: Login},
    {
      path: '/console',
      component: Console,
      children: [
        {path: '', component: Articles},
        {path: 'articles', name: 'articles', component: Articles},
        {path: 'editor', name: 'editor', component: Editor},
        {path: 'links', name: 'links', component: Links},
        {path: 'account', name: 'account', component: Account}
      ]
    }
  ]
})
