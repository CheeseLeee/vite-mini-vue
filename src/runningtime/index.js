import {isObject} from '../untils'
import {effect} from '../reactive/reactive'
import {mount,patch} from '../runningtime/renderer'
export function createApp(rootComponent,rootComponentProps){
    processComponent(rootComponent,rootComponentProps)
    let proxy = rootComponent._instance.proxy
    //ctx.count = 1  ==> count = 2
    return {
        childrenComponents:[],
        mount(selector){
            var container = document.querySelector(selector)
            let isMounted = false
            let oldVnode = null
            effect(() => {
                if(!isMounted){
                    oldVnode = rootComponent.render(proxy)
                    mount(oldVnode,container)
                    isMounted = true
                }else{
                    const newVnode = rootComponent.render(proxy)
                    patch(oldVnode,newVnode)
                    oldVnode = newVnode
                }
            })
        },
        component(childComName,childComData){
            this.childrenComponents.push(childComName)
            registerComponent(childComData)
        }
    }
}

function registerComponent(childComData){
    processComponent(childComData)
    console.log(childComData)
}

function processComponent(rootComponent,rootComponentProps){
    let instance = {
        props:rootComponentProps || {},
        attrs:{},
        setupState:null,
        proxy:null,
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
            debugger
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