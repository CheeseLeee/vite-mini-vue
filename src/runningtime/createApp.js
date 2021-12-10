import {
    isObject
} from '../untils'
import {
    effect
} from '../reactive/reactive'
import {
    mount,
    patch
} from './renderer'
import {
    processComponent,
    registerComponent
} from './component'

function checkInComponent(fatherCom,com){
    console.log(fatherCom,'fff')
}

function filterRegister(children, target,preComInstance) {  
    debugger
    if (!Array.isArray(children)) return
    let filterArr = children.map(item => {        
        let hasInRootChildrne = target.indexOf(item.tag) !== -1 ? true : false        
        if(hasInRootChildrne){

            var currentComData = item.tag
            console.log(currentComData,'aaa')
/*             if(typeof item.tag !== 'string' ){
                checkInComponent(item)
            }  */ 
            processComponent(currentComData,item.props)  
            console.log(currentComData)
            let proxy = currentComData._instance.proxy            
            let v = currentComData.render(proxy) 
            item = v   
            if(Array.isArray(item.children)){
                item.children = filterRegister(item.children, target)//currentComData._instance.childrenComponent
            }                        
        }
 
        return item
    })
    console.log(filterArr)
    return filterArr
}
export function createApp(rootComponent, rootComponentProps) {
    processComponent(rootComponent, rootComponentProps)
    let proxy = rootComponent._instance.proxy
    
    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents: [],
        isRoot: true,
        mount(selector) {
            var container = document.querySelector(selector)
            let isMounted = false
            let oldVnode = null
            effect(() => {
                if (!isMounted) {
                    oldVnode = rootComponent.render(proxy)
                    let filterOldVnode = {
                        ...oldVnode
                    }
                    filterOldVnode.children = filterRegister(oldVnode.children, this.childrenComponents)
                    mount(filterOldVnode, container)
                    isMounted = true
                } else {
                    console.log('??')
                    const newVnode = rootComponent.render(proxy)
                    patch(filterOldVnode, newVnode)
                    oldVnode = newVnode
                }
            })
        },
        component(childComName, childComData) {
            this.childrenComponents.push(childComData)
            //registerComponent(childComName, childComData)

        }
    }
}