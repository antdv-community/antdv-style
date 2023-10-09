import { nextTick } from 'vue'

export function safeStartTransition(func: Function) {
  nextTick(() => {
    func?.()
  }).then(() => {})
}
