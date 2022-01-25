const targetMap = new WeakMap()
let activeEffect = null
export function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }
        let dep = depsMap.get(key)
        if (!dep) {
            dep = new Set()
            depsMap.set(key, dep)
        }
        dep.add(activeEffect)
    }
}
export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }
    let dep = depsMap.get(key)
    if (dep) {

        dep.forEach(effect => {
            if (effect.scheduler) {
                
                effect.scheduler()
            } else {
                effect()
            }

        })
    }
}
export function effect(eff, option = {}) {
    if (option.lazy) {
        eff.scheduler = option.scheduler
        option.scheduler()
       
    }
    activeEffect = eff
    activeEffect()
    activeEffect = null
}