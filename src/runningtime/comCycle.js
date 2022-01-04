import {addMounted } from './component'
export function updated(fn){

}

export function onMounted(fn){
    if(!fn) return
    
    addMounted(fn)
}
