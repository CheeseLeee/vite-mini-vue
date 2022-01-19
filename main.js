import './style.css'
import { createApp } from './packages/runningtime/createApp'
import Appcom from './App'
import AppChild from './src/components/AppChild'
import { Router } from './packages/router'
import { addRouterViews, RouterView } from './packages/router/component/RouterView'
import Menu from './src/views/Menu'
import Com from './src/views/Com'
const routes = [
    { path: '/', component: Com },
    { path: '/menu', component: Menu }
  ]
var router = new Router({
    mode:'hash',
    routes
})

const App = createApp(Appcom)
App.component('appChild',AppChild)
App.component('Menu',Menu)
App.component('RouterView',RouterView)
App.component('Com',Com)
App.mount('#app')
