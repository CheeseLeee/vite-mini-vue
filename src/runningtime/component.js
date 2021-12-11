import { effect } from '../reactive/reactive'
import {
    isObject
} from '../untils'
 '../runningtime/renderer'
import {mount,patch} from './renderer'
export function registerComponent(componentName, childComData) {
    //processComponent(childComData, undefined, componentName)
}
let uid = 0
export function processComponent(rootComponent, rootComponentProps, componentName) {

    let comid = uid++ 
    let instance = {
        name: componentName,
        children: [],
        props:rootComponentProps,
        attrs: {},
        setupState: null,
        proxy: null,
        uid:comid,
        component(childComponent) {

        },
        childrenComponent: [],
        ctx: {
            emit() {
                console.log('emit')
            },
            props: rootComponentProps
        }
    }
    let propsHandler = {
        get(target, key, reciver) {
            return Reflect.get(target, key, reciver)
        },
        set(target, key, value, reciver) {
            console.warn('修改失败,单向数据流中禁止修改传递的props')
            return Reflect.set(target, key, Reflect.get(target, key, reciver), reciver)
        }
    }
    if(rootComponent.component){
        for(var k in  rootComponent.component){
            instance.childrenComponent.push({...rootComponent.component[k]})
        }
    }
    let propsProxy = new Proxy(instance, propsHandler)
    let setupResult = rootComponent.setup(propsProxy, instance.ctx)
    if (isObject(setupResult)) {
        instance.setupState = setupResult
    }
    let handler = {
        get(target, key, reciver) {          
            if (target.setupState[key]) {
                return Reflect.get(target.setupState, key)
            } else {
                return Reflect.get(target.props, key)
            }
        },
        set(target, key, value, recier) {
            if (target.setupState[key]) {
                return Reflect.set(target.setupState, key, value)
            } else {
                console.warn('err');
            }
        }
    }
    instance.proxy = new Proxy(instance, handler)
    rootComponent._instance = instance
}