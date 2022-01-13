import { createApp } from './packages/runningtime/createApp'
import { h } from './packages/runningtime/h'
import AppChild from './src/components/AppChild'
export const App = createApp({
    setup(){

    },
    render(){
        return h('div',{},[
            h('p',{class:'colorRed'},'i am Root'),
            h(AppChild,{},''),
        ])
    }
})