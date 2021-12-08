import './style.css'
import {h} from './src/runningtime/renderer'
import {createApp} from './src/runningtime/index'
import {ref,reactive,computed} from './src/reactive/reactive'
var rootDom = document.getElementById('app')
const HelloWorld = {
    setup() {

    },
    render() {
        return h('p', {}, [
            h('h2', {}, '我是Hello-world组件')
        ])
    }
}
const APP = {
    setup(props, ctx) {
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
            h(HelloWorld, {}, {}),
        ])
    }
}
const app = createApp(APP)
console.log(app)
app.mount('#app')