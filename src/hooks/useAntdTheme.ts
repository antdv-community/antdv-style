import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AntdTheme } from '../types'
import { useAntdStylish } from './useAntdStylish'
import { useAntdToken } from './useAntdToken'

export function useAntdTheme(): ComputedRef<AntdTheme> {
  const token = useAntdToken()
  const stylish = useAntdStylish()

  return computed(() => ({ ...token.value, stylish: stylish.value }))
}
