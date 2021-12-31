 
l/* et callbacks = []
let pending = false
export function nextTick(cb) {
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
  copies.forEach(copy => {
    copy()
  })
} */