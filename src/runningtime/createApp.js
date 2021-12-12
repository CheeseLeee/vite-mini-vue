import {
    isObject
} from '../untils'
import {
    effect,
    ref
} from '../reactive/reactive'
import {
    mount,
    patch,
    childrenComponents
} from './renderer'
import {
    processComponent,
    registerComponent
} from './component'

export function createApp(rootComponent, rootComponentProps) {
    processComponent(rootComponent, rootComponentProps,'root')
    let proxy = rootComponent._instance.proxy   
    let isMounted = false
    let oldVnode = null

    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents: [],
        isRoot: true,
        mount(selector) {
            var container = document.querySelector(selector)
            if (!isMounted) {                
                oldVnode = rootComponent.render(proxy)
                mount(oldVnode, container)
                isMounted = true
                
            }

/*              effect(() => {
                if (!isMounted) {
                    oldVnode = rootComponent.render(proxy)
                    
                    mount(oldVnode, container)
                    isMounted = true
                } else {
                    console.log('effect')
                    const newVnode = rootComponent.render(proxy)
                    patch(oldVnode, newVnode)
                    oldVnode = newVnode
                }
            })  */
        },
        component(childComName, childComData) {
            childrenComponents.push(childComData)
        }
    }
}