import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'
import { ref, reactive, computed } from './src/reactive/reactive' 

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
            h('h2',{},`${proxy.name}`)
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
            //console.log(props.num++)
        }
        return {
            conut,changeCount
        }
    },  
    render(proxy){
        if(proxy.num){
            return h('div',{class:'colorGreen'},[
                h('p',{},'son-conut:' + proxy.conut.value),
                h('button',{onClick:proxy.changeCount},'changeSon-Count'),
                h('h2',{},`propsShow:${proxy.num}`),
                h(AppSonChild ,{name:'marry'},{})
            ])
        }else{
            return h('div',{class:'colorGreen'},[
                h('p',{},'son-conut:' + proxy.conut.value),
                h('button',{onClick:proxy.changeCount},'changeSon-Count'),
                h(AppSonChild ,{},{})
            ])           
        }

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
            h(AppSon,{},{}),
            h(AppSon,{num:2},{}),
            
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