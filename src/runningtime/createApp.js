import {isObject} from '../untils'
import {effect} from '../reactive/reactive'
import {mount,patch} from '../runningtime/renderer'

export function createApp(rootComponent,rootComponentProps){
    processComponent(rootComponent,rootComponentProps)
    let proxy = rootComponent._instance.proxy
    let oldVnode
    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents:[],
        mount(selector){
            var container = document.querySelector(selector)
            let isMounted = false
            oldVnode = null
            effect(() => {              
                if(!isMounted){
                    oldVnode = rootComponent.render(proxy)
                    let oldVnodeWithComponent = {...oldVnode}
/*                     debugger
                    oldVnodeWithComponent.children = oldVnode.children.map(vnode => {
                        if(isObject(vnode.tag)){
                            if(this.childrenComponents.includes(vnode.tag)){  
                                //console.log(this.childrenComponents)                                                                 
                                return vnode.tag.render(vnode.tag._instance.proxy)
                            }
                            return vnode                          
                        }else{
                            return vnode
                        }
                    });
                    debugger */
                    mount(oldVnodeWithComponent,container)
                    isMounted = true
                }else{
                    const newVnode = rootComponent.render(proxy)
                    patch(oldVnode,newVnode)
                    oldVnode = newVnode
                }
            })
        },
        component(componentName,childComData){
            this.childrenComponents.push(childComData)  
            let rootComponentVnode = rootComponent.render(proxy)            
            rootComponentVnode.children.forEach(vnode => {                
                if(this.childrenComponents.includes(vnode.tag)){                    
                    registerComponent(childComData,vnode.props,componentName)                    
                }
            });

        }
    }
}

function processChildrenComponent(rootComponent,childrenComponent){

}

function registerComponent(childComData,childComProps,componentName){   
    //processChildrenComponent()
    processComponent(childComData,childComProps,componentName)
    console.log(childComData)
}

function processComponent(rootComponent,rootComponentProps,componentName = 'RootComponent'){
    let instance = {
        name:componentName,
        props:rootComponentProps || {},
        attrs:{},
        setupState:null,
        proxy:null,
        component(childComponent){

        },
        ctx:{
            emit(){
                console.log('emit')
            },
            props:rootComponentProps
        }
    }
    let propsHandler = {
        get(target,key,reciver){
            return Reflect.get(target,key,reciver)
        },
        set(target,key,value,reciver){
            console.warn('修改失败,单向数据流中禁止修改传递的props')
            return Reflect.set(target,key,Reflect.get(target,key,reciver),reciver)
        }
    }
    let propsProxy = new Proxy(instance,propsHandler)
    let setupResult = rootComponent.setup(propsProxy,instance.ctx)
    if(isObject(setupResult)){
        instance.setupState = setupResult
    }
    let handler = {        
        get(target,key,reciver){            
            if(target.setupState[key]){
                return Reflect.get(target.setupState,key)  
            }else{
                return Reflect.get(target.props,key)
            }           
        },
        set(target,key,value,recier){
            
            if(target.setupState[key]){
                return Reflect.set(target.setupState,key,value)
            }else{
                console.warn('err');
            }
        } 
    }
    instance.proxy = new Proxy(instance,handler)
    rootComponent._instance = instance
}