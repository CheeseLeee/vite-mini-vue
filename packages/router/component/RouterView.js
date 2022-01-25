import { h } from "../../runningtime/h"
import { ref } from "../../reactive/ref"
let routerViews = new Map()
export function addRouterViews(path,com){
    routerViews.set(path,com)
}
export const RouterView = {
    currentPath:ref('/'),
    isRouterView:true,
    setup(){

    },
    component:{
        
    },
    render(){   
        
        console.log(this.currentPath.value)
        return h(routerViews.get(this.currentPath.value),{},'')
    }
}
