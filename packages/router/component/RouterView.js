import { h } from "../../runningtime/h"
import Menu from '../../../src/views/Menu'
let routerViews = []
export function addRouterViews(com){
    routerViews.push(com)
    console.log(routerViews)
}
export const RouterView = {
    setup(){

    },
    component:{
        Menu
    },
    render(){   
           
        console.log(routerViews[0])  
        return h(routerViews[0],{},'div')
    }
}
