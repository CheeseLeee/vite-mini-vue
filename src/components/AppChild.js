import { h } from '../../packages/runningtime/h'
import { ref, computed } from '../../packages/hooks' 
export default {    
    setup(){
        const num = ref(0)
        window.n = num
        
        function changeNum(){
            num.value++
            num.value++
            num.value++
            num.value++

        }
        const c = computed(() => {
            console.log('ccc')
            return num.value * 2
        })
        window.c = c
        return {
            num,
            changeNum,
            c
        }
    },
    updated(){
        console.log('updated')
    },
    render(proxy){
        console.log('c')
        return h('div',{class:'colorGreen'},[
            h('p',{class:'appChild'},'I am appChild----' + proxy.num.value),
            h('button',{onClick:proxy.changeNum},'changeNumBtn'),
            h('h2',{},`${proxy.c.value}`)
        ])
    }
}