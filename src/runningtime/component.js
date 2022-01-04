import {
    isObject
} from '../untils'
 '../runningtime/renderer'


export function defineComponent(com){
    return {...com}
}
let uid = 0
let mountedMethod
export function addMounted(fn){
    mountedMethod = fn
    console.log(mountedMethod)
}

export function processComponent(component, componentProps, componentName) {

    let comid = uid++ 
    let instance = {
        name: componentName,
        children: [],
        props:componentProps,
        attrs: {},
        setupState: null,
        proxy: null,
        uid:comid,
        mountedMethods:null,
        component(childComponent) {

        },
        childrenComponent: [],
        ctx: {
            emit() {
                console.log('emit')
            },
            props: componentProps
        }
    }
    
    let propsHandler = {
        
        get(target, key, reciver) {
            
            return Reflect.get(target.props, key, reciver)
        },
        set(target, key, value, reciver) {
            console.warn('修改失败,单向数据流中禁止修改传递的props')
            return Reflect.set(target, key, Reflect.get(target, key, reciver), reciver)
        }
    }
    if(component.component){
        for(var k in  component.component){
            instance.childrenComponent.push({...component.component[k]})
        }
    }
    let propsProxy = new Proxy(instance, propsHandler)
    let setupResult = component.setup(propsProxy, instance.ctx)
    instance.mountedMethods = mountedMethod
    if (isObject(setupResult)) {
        instance.setupState = setupResult
    }
    let handler = {
        get(target, key, reciver) {   
            if (target.setupState[key]) {
                return Reflect.get(target.setupState, key)
            } else if(target.props[key]) {
                return Reflect.get(propsProxy, key)
            } else {
                return undefined
            }
        },
        set(target, key, value, recier) {
            debugger
            if (target.setupState[key]) {
                let isRight = Reflect.set(target.setupState, key, value)
                console.log(isRight)
                
                return isRight
            } else {
                console.warn('err');
            }
        }
    }
    component.instance = instance
    return new Proxy(instance, handler)

}


