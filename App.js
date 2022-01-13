import { RouterView } from './packages/router/component/RouterView'

import { h } from './packages/runningtime/h'
import AppChild from './src/components/AppChild'
export default  {
    setup(){

    },
    render(){
        console.log(h(RouterView,{},{}),)
        return h('div',{},[
            h(RouterView,{},{}),
            h('p',{class:'colorRed'},'i am Root'),
            h(AppChild,{},''),
            
        ])
    }
}