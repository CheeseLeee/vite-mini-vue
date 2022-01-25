import {
    isObject
} from '../untils/untils'
import {
    effect,
} from '../reactive/effect'
import {
    mount,
    patch,
    childrenComponents
} from './renderer'
import {
    processComponent,
 
} from './component'

export function createApp(rootComponent, rootComponentProps) {
    console.log('create')
    let proxy = processComponent(rootComponent, rootComponentProps, 'root')
    let isMounted = false
    let oldVnode = null

    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents: [],
        isRoot: true,
        mount(selector) {
            var container = document.querySelector(selector)
            effect(() => {
                if (!isMounted) {
                    
                    oldVnode = rootComponent.render(proxy)   
                    
                    let lastDom = oldVnode
                    lastDom.onMounted = rootComponent.instance.mountedMethodCB
                } else {
                    console.log('effect')
                    const newVnode = rootComponent.render(proxy)
                    
                    patch(oldVnode, newVnode)
                    oldVnode = newVnode
                }
            })            
            if (!isMounted) {
                mount(oldVnode, container)
                isMounted = true
            }
        },
        component(childComName, childComData) {
            childrenComponents.push(childComData)
        }
    }
}