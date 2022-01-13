 
let callbacks = []
let pending = false

export function nextTick(cb) {
  let has = callbacks.some(item => {
    return item === cb ? true : false
  })
  if(has) return
  callbacks.push(cb)
  if (!pending) {
    pending = true
    setTimeout(flushCallback, 0)
  }
}

function flushCallback() {
  pending = false
  let copies = callbacks.slice()
  callbacks.length = 0
  copies.forEach(cb => {
    cb()
  })
}