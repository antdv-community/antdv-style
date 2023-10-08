import type { Ref } from 'vue'
import { shallowRef, unref, watchEffect } from 'vue'

export function useMergeValue<T>(defaultStateValue: T, options: {
  value: Ref<T>
  defaultValue: T
  onChange: (v: T) => void
}): [Ref<T>, (v: T) => void] {
  const val = shallowRef<T>(unref(defaultStateValue))
  watchEffect(() => {
    val.value = options.value.value ?? options.defaultValue
  })
  const setValue = (v: T) => {
    val.value = v
    options?.onChange?.(v)
  }
  return [val, setValue]
}
