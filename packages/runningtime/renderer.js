import { effect } from "../reactive/effect"
import { RouterView } from "../router/component/RouterView"
import {
    isObject
} from '../untils/untils'
import { processComponent } from "./component"
import { nextTick } from "./nextTick"

export let childrenComponents = [RouterView]
export const mount = (vnode, container) => {
    
    if (typeof vnode.tag === 'string') {
        var el = vnode.el = document.createElement(vnode.tag)
        if (vnode.props) {
            for (var k in vnode.props) {
                if (k.startsWith('on')) {
                    var methodKey = k.toLowerCase().substring(2)
                    el.addEventListener(methodKey, vnode.props[k])
                } else {
                    var value = vnode.props[k]
                    el.setAttribute(k, value)
                }
            }
        }
        if (vnode.children) {
            if (typeof vnode.children === 'string') {
                container.appendChild(el)
                el.textContent = vnode.children
            } else {
                container.appendChild(el)
                vnode.children.forEach(element => {
                    mount(element, el)
                });
            }
        }
        //container.appendChild(el)
        if(vnode.onMounted){
            
            vnode.onMounted.forEach(fn => {
                fn()
            })
            
        }
    } else {
        let com = vnode.tag
        checkeInRootComponent(com, vnode, container)
    }
}


function checkeInRootComponent(com, vnode, container) {
    if (typeof com === 'string') return
    let isInPreCom
    if (com.partent) {
        for (var k in com.partent.component) {
            if (com === com.partent.component[k]) {
                isInPreCom = true
            }
        }
    }
    let isInRootComponent = childrenComponents.includes(com)
    if (isInRootComponent || isInPreCom) {
        mountCom(com, vnode, container)
    } else {
    }
}

function mountCom(com, vnode, container) {
    
    let proxy = processComponent(com, vnode.props, com.name)
    //处理相同的组件复用
    let cloneCom = { ...com }
    cloneCom.isMounted = false
    let comRenderVode
    function ef() {
        //cloneCom.updated()
        comRenderVode = cloneCom.render(proxy)
        
        if(cloneCom.isRouterView){
            comRenderVode = comRenderVode.tag.render(proxy)              
        }
        patch(cloneCom.oldVnode, comRenderVode)
        cloneCom.oldVnode = comRenderVode
    

    }
    cloneCom.watcher = ef
    effect(() => {
        if (!cloneCom.isMounted) {
            comRenderVode = cloneCom.render(proxy)
            
            if(cloneCom.isRouterView){
                comRenderVode = comRenderVode.tag.render(proxy)              
            }
            if(Array.isArray(comRenderVode.children) ){
                comRenderVode.children.forEach(ele => {
                    if (isObject(ele.tag)) {
                        ele.tag.partent = cloneCom
                    }
                })
            }

            let lastDom = comRenderVode
            lastDom.onMounted = cloneCom.instance.mountedMethodCB
      
            cloneCom.oldVnode = comRenderVode
            cloneCom.isMounted = true

        } else {
            nextTick(cloneCom.watcher)
        }
    })

    let isNotNestedComSelf = notNestedComSelf(comRenderVode, com)
    if (isNotNestedComSelf) {
        mount(comRenderVode, container)
    }
}

function notNestedComSelf(comVnode, currentCom) {
    let isNot = true
    if (Array.isArray(comVnode.children)) {
        let children = comVnode.children
        children.forEach(vnode => {
            if (vnode.tag === currentCom) {
                console.error('禁止嵌套当前组件本身:' + currentCom._instance.name);
                isNot = false
            }
        })
    }
    return isNot
}

export function patch(n1, n2) {
    
    if (isObject(n1.tag) && isObject(n2.tag) && n1.tag === n2.tag) return
    if (n1.tag !== n2.tag) {
        const n1ElPartent = n1.el.parentNode
        n1ElPartent.removeChild(n1.el)
        mount(n2, n1ElPartent)
    } else {
        const el = n2.el = n1.el
        const oldProps = n1.props
        const newProps = n2.props
        for (var k in oldProps) {
            if (oldProps[k] !== newProps[k]) {

                if (k.startsWith('on')) {
                    var methodKey = k.toLowerCase().substring(2)
                    el.removeEventListener(methodKey, oldProps[k])
                } else {
                    el.removeAttribute(k)
                }
            }
        }
        for (var k in newProps) {
            if (oldProps[k] !== newProps[k]) {
                if (k.startsWith('on')) {
                    var methodKey = k.toLowerCase().substring(2)
                    el.addEventListener(methodKey, newProps[k])
                } else {
                    el.setAttribute(k, newProps[k])
                }
            }
        }
        const oldChildren = n1.children
        const newChildren = n2.children
        if (typeof newChildren === 'string') {

            el.innerHTML = newChildren
        } else if (newChildren === null) {

        } else {
            const commonArr = Math.min(oldChildren.length, newChildren.length)
            for (var i = 0; i < commonArr; i++) {
                patch(oldChildren[i], newChildren[i])
            }
            if (oldChildren.length > newChildren.length) {
                oldChildren.slice(commonArr).forEach(item => {
                    el.removeChild(item.el)
                })
            }
            if (oldChildren.length < newChildren.length) {
                newChildren.slice(commonArr).forEach(item => {
                    mount(item, el)
                })
            }
        }
    }
}