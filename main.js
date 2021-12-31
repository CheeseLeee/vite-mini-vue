import './style.css'
import { h } from './src/runningtime/h'
import { createApp } from './src/runningtime/createApp'
import { ref, reactive, computed } from './src/reactive/reactive' 

const appChild = {
    setup(){
        const num = ref(0)
        function changeNum(){
            num.value++
            var ele = document.getElementById('appChild')
            console.log(ele.innerHTML)
        }
        return {
            num,
            changeNum
        }
    },
    updated(){
        console.log('updated')
    },
    render(proxy){
        return h('div',{class:'colorGreen'},[
            h('p',{id:'appChild'},'I am appChild----' + proxy.num.value),
            h('button',{onClick:proxy.changeNum},'changeNumBtn')
        ])
    }
}

const App = createApp({
    setup(){

    },
    render(){
        return h('div',{},[
            h('p',{class:'colorRed'},'i am Root'),
            h(appChild,{},'')
        ])
    }
})
App.component('appChild',appChild)
App.mount('#app')
