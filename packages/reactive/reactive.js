import { track,trigger } from "./effect"

//console.log(`total:${total};salePrice:${salePrice.value}`) //9,4.5
//var n = product.quantity

//console.log(`total:${total};salePrice:${salePrice.value}`) //13.5,4.5

//console.log(`total:${total};salePrice:${salePrice.value}`) //27,9 



export function reactive(target) {
    const handler = {
        get(target, key, reciver) {
            let result = Reflect.get(target, key, reciver)

            track(target, key)
            return result
        },
        set(target, key, value, reciver) {
            if (target[key] !== value) {
                var result = Reflect.set(target, key, value, reciver) //boolean
                trigger(target, key)
            }
            return result
        }
    }
    return new Proxy(target, handler)
}



