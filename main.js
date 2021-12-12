import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'

import { ref, reactive, computed } from './src/reactive/reactive' 

const AppChild = {
    setup(props,ctx){
        let count = ref(0)
        function changeCount(){
            count.value++
        }
        return {
            count,changeCount
        }
    },
    render(proxy){
        return h('div',{class:'colorRed'},[
            h('p',{},'child-conut:' + proxy.count.value),
            h('button',{onClick:proxy.changeCount},'changechild-Count'),
        ])
    }  
}
const App = {
    setup(props,ctx){
        let count = ref(0)
        function changeCount(){
            count.value++
        }
        return {
            count,changeCount
        }
    },
    render(proxy){
        return h('div',{class:'colorGreen'},[
            h('p',{},'conut:' + proxy.count.value),
            h('button',{onClick:proxy.changeCount},'changeCount'),
            h(AppChild,{},{})
        ])
    }
}

const app = createApp(App,{name:'vue'})
console.log(app)
app.component('AppChild',AppChild)
app.mount('#app')