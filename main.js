import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'
import { ref, reactive, computed } from './src/reactive/reactive' 
import { nextTick ,onMounted,onUpdated} from './src/hooks'
const appChild = {    
    setup(){
        onMounted(() => {
            var b = document.getElementById('app')
            var d = document.getElementsByClassName('appChild')[0]
            console.log(d,'ddddddd')
        })
        onMounted(() => {
            console.log('second mounted')
        })
        onUpdated(() => {
            console.log('onUpdated')
        })
        const num = ref(0)
        function changeNum(){
            num.value++
            num.value++
            num.value++
            num.value++
        }
        return {
            num,
            changeNum
        }
    },

    render(proxy){
        return h('div',{class:'colorGreen'},[
            h('p',{class:'appChild'},'I am appChild----' + proxy.num.value),
            h('button',{onClick:proxy.changeNum},'changeNumBtn')
        ])
    }
}

const App = createApp({
    setup(){
        onMounted(() => {
            console.log('second mounted app')
        })
        onMounted(() => {
            var d = document.getElementsByClassName('colorGreen')[0]
            console.log(d)
        })
    },
    render(){
        return h('div',{},[
            h('p',{class:'colorRed'},'i am Root'),
            h(appChild,{},''),
        ])
    }
})
App.component('appChild',appChild)
App.mount('#app')
