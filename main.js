import './style.css'
import { h } from './packages/runningtime/h'
import { ref, reactive, computed } from './packages/reactive/reactive' 
import { nextTick ,onMounted} from './packages/hooks'
import { Router } from './packages/router'
import {App} from './App'
import AppChild from './src/components/AppChild'
var router = new Router('hash')
router.init()
router.route('/',function(){
    alert('/')
})
router.route('/menu',function(){
    alert('/menu')
})

App.component('appChild',AppChild)
App.mount('#app')
