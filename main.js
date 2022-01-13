import './style.css'
import { createApp } from './packages/runningtime/createApp'
import Appcom from './App'
import AppChild from './src/components/AppChild'
import { Router } from './packages/router'
import { addRouterViews, RouterView } from './packages/router/component/RouterView'
import Menu from './src/views/Menu'
var router = new Router('hash')

router.route('/',function(){
    addRouterViews(Menu)
    console.log(router)
    
})
router.route('/menu',function(){
    addRouterViews(Menu)
    console.log(router)
})
addRouterViews(Menu)
router.init()
const App = createApp(Appcom)
App.component('appChild',AppChild)
App.component('RouterView',RouterView)
App.component('Menu',Menu)
App.mount('#app')
