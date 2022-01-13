import { h } from '../../packages/runningtime/h'
import { ref, reactive, computed } from '../../packages/reactive/reactive' 
export default {    
    setup(){
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
    updated(){
        console.log('updated')
    },
    render(proxy){
        return h('div',{class:'colorGreen'},[
            h('p',{class:'appChild'},'I am appChild----' + proxy.num.value),
            h('button',{onClick:proxy.changeNum},'changeNumBtn')
        ])
    }
}