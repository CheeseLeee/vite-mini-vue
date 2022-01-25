import { effect } from "./effect"
export function computed(getter) {
    /*     let result = ref()
        effect(() => {
            result.value = getter()
        }) */
    return new ReactiveComputed(getter)
}

class ReactiveComputed {
    constructor(getter) {
        this.dirty = true
        this._value = null
        this.getter = getter
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {                
                if (!this.dirty) {
                    console.log('scheduler')
                    this.dirty = true
                    //trigger(this,'value')                    
                }
            }
        })
    }
    get value() {
        console.log('cc')
        if (this.dirty) {
            this._value = this.getter()
            this.dirty = false
            //track(this,'value')
        }
        return this._value
    }
    set value(newValue) {
        //this._value = newValue
        console.warn('computed.value is only readonly')
    }
}