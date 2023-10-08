import { nextTick } from 'vue'

export const safeStartTransition = (func: Function) => {
  nextTick(() => {
    func?.()
  }).then(() => {})
}
