import type { InjectionKey } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { inject, provide } from 'vue'

const useContextManager = createGlobalState(() => {
  const manager = new Map<InjectionKey<any>, any>()
  const setContext = <T = any> (value: T, key: InjectionKey<T>) => {
    manager.set(key, value)
  }
  const getContext = <T = any>(key: InjectionKey<T>) => {
    return manager.get(key)
  }
  return {
    setContext,
    getContext,
  }
})

export function createContext<T>(params: T) {
  const key: InjectionKey<T> = Symbol('key')
  const { setContext } = useContextManager()
  setContext<T>(params, key)
  provide(key, params)
  return key
}

export function useContext<T = any>(key: InjectionKey<T>) {
  const { getContext } = useContextManager()
  const context = getContext<T>(key)
  return inject<T>(key, context)
}
