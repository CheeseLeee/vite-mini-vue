import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'

import { ref, reactive, computed } from './src/reactive/reactive' 

const HelloMiniVue = {
    setup(){
        return {

        }
    },
    component:{

    },
    render(proxy){
        return  h('div',{},[
            h('h2', {class:'colorGreen'}, '我是Hello-mini-mue'),
            h('h2', {class:'colorGreen'}, 'props' + proxy.comUid)
        ])

    }
}
const HelloWorld = {
    component:{
        HelloMiniVue
    },
    setup(props,ctx) {
        let comUid = ref(2000)
        function changeComuid(){
            comUid.value++
        }
        return {comUid,changeComuid }
    },
    render(proxy) { 
        return h('p', {}, [
            h(HelloMiniVue,{comUid:5},[]),          
            h('button', {onClick:proxy.changeComuid}, '改变uid'),
            h('h2',{},`props${proxy.comUid.value}`),
        ])
    }
}

const APP = {
    setup(props, ctx) {
        
        props.name = '2'
        let count = ref(0)
        function handleClick() {
            count.value++
        }
        let product = reactive({
            price: 100,
            n: 2
        })
        let pay = computed(() => {
            if (product.price > 500) {
                return product.price * product.n * 0.8
            } else {
                return product.price * product.n
            }
        })

        function changePay() {
            product.price += 100
        }

        function changePay2() {
            product.n += 1
        }
        return {
            count,
            handleClick,
            pay,
            changePay,
            changePay2,
            product
        }
    },
    render(proxy) {
        return h('div', {
            class: 'colorRed'
        }, [
            h('h2', {
                class: 'colorGreen'
            }, `count:${proxy.count.value}`),
            h('button', {
                onClick: proxy.handleClick
            }, 'count++'),
            h('h2', {}, `pay${proxy.pay.value}`),
            h('h2', {}, `n--${proxy.product.n}`),
            h('button', {
                onClick: proxy.changePay
            }, 'changePay'),
            h('button', {
                onClick: proxy.changePay2
            }, 'changePay2'),
            h(HelloWorld, {comUid:1}, null),
            h('p',{},`name:${proxy.name}`)
        ])
    }
}
const app = createApp(APP,{name:'vue'})
console.log(app)
app.component('HelloWorld',HelloWorld)
//app.component('HelloMiniVue',HelloMiniVue)
app.mount('#app')