import type { DefineComponent, InjectionKey } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { defineComponent, inject, provide } from 'vue'

export interface Context<T = any> {
  key: InjectionKey<T>
  Provider: DefineComponent<{ value: any }>
}

const useContextManager = createGlobalState(() => {
  const manager = new WeakMap<Context, any>()
  const setContext = <T = any> (value: T, key: Context<T>) => {
    manager.set(key, value)
  }
  const getContext = <T = any>(key: Context<T>) => {
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
  const context: Context<T> = {
    key,
    Provider: defineComponent<{ value: any }>((props, { slots }) => {
      provide(key, props.value)
      return () => slots?.default?.()
    }) as any,
  }
  setContext<T>(params, context)
  return context
}

export function useContext<T = any>(key: Context<T>) {
  const { getContext } = useContextManager()
  const context = getContext<T>(key)
  return inject<T>(key.key, context)
}
