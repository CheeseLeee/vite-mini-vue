

import {isObject} from '../untils'
import {effect} from '../reactive/reactive'
import {mount,patch} from './renderer'
import {processComponent,registerComponent} from './component'
function filterRegister(children,target){
    
    let filterArr = children.map(item => {
        console.log(item)
        if(isObject(item.tag)){            
            let has = target.indexOf(item.tag) !== -1 ? true : false
            if(has){
                var v = item.tag.render()
                debugger
                console.log(v,'v')
                //let a = filterRegister(v.children,item.tag._instance.children)
                let a = filterRegister(v.children,target)
                console.log(a,'a')
            }                      
            return v
        }else{
            return item
        }
    })
    console.log(filterArr)
    return filterArr
}
export function createApp(rootComponent,rootComponentProps){
    processComponent(rootComponent,rootComponentProps)
    let proxy = rootComponent._instance.proxy
    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents:[],
        isRoot:true,
        mount(selector){
            var container = document.querySelector(selector)
            let isMounted = false
            let oldVnode = null
            effect(() => {
                if(!isMounted){
                    oldVnode = rootComponent.render(proxy)
                    let filterOldVnode = {...oldVnode}
                    
                    filterOldVnode.children  = filterRegister(oldVnode.children,this.childrenComponents)        
   
                    mount(filterOldVnode,container)
                    isMounted = true
                }else{
                    const newVnode = rootComponent.render(proxy)
                    patch(oldVnode,newVnode)
                    oldVnode = newVnode
                }
            })
        },
        component(childComName,childComData){
            this.childrenComponents.push(childComData)
            registerComponent(childComName,childComData)
            
        }
    }
}


