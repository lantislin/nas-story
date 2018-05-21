import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/router.js'
import Create from '@/pages/Create/router.js'
import Detail from '@/pages/Detail/router.js'
import FAQ from '@/pages/FAQ/router.js'
import Contact from '@/pages/Contact/router.js'
import CreatePassage from '@/pages/CreatePassage/router.js'


Vue.use(Router)

let routes = [];

routes.push.apply(routes, Home)
routes.push.apply(routes, Create)
routes.push.apply(routes, Detail)
routes.push.apply(routes, FAQ)
routes.push.apply(routes, Contact)
routes.push.apply(routes, CreatePassage)

export default new Router({
  routes: routes
})
