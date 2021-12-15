import {isObject} from '../untils'
export const h = (tag,props,children) => {
    let vnode = {
        tag,
        props,
        children
    }
    if(typeof tag === 'string'){
        return vnode
    }else if(isObject(tag)){          
        
        return vnode//tag.render()
    }    
}