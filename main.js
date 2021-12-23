import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'

import { ref, reactive, computed } from './src/reactive/reactive' 
import { defineComponent } from './src/runningtime/component'

const AppSonChild = {
    name:"AppSonChild",
    setup(props,ctx){
        let conut = ref(0)
        function changeCount(){
            conut.value++
        }
        return {
            conut,changeCount
        }
    },  
    render(proxy){
        return h('div',{class:'colorGreen'},[
            h('p',{},'AppSonChild-conut:' + proxy.conut.value),
            h('button',{onClick:proxy.changeCount},'AppSonChild-Count'),
        ])
    }  
}

const AppSon = {
    name:"AppSon",
    component:{
        AppSonChild
    },
    setup(props,ctx){
        let conut = ref(0)
        function changeCount(){
            conut.value++
            console.log(conut.value)
            console.log(ctx)
        }
        return {
            conut,changeCount
        }
    },  
    render(proxy){
        console.log('-----------------------')
        console.log(proxy.conut.value,'???')
        return h('div',{class:'colorGreen'},[
            h('p',{},'son-conut:' + proxy.conut.value),
            h('button',{onClick:proxy.changeCount},'changeSon-Count'),
            h(defineComponent(AppSonChild) ,{},{})
        ])
    }  
}

const AppChild = {
    component:{
        AppSon
    },
    setup(props,ctx){
        let prduct = reactive({
            price:100,
            n:1
        })
        function changePrice(){
            prduct.n++
        }
        return {
            prduct,changePrice
        }
    },
    render(proxy){
        return h('div',{class:'colorRed'},[
            h('p',{},'child-conut:' + proxy.prduct.n),
            h('button',{onClick:proxy.changePrice},'changechild-price'),
            h(defineComponent(AppSon),{},{}),
            h(defineComponent(AppSon),{},{}),
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
            h('p',{},'woSHIP'),
            h(AppChild,{},{}),
           
        ])
    }
}

const app = createApp(App,{name:'vue'})
console.log(app)
app.component('AppChild',AppChild)
app.mount('#app')