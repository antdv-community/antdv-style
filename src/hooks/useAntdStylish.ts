import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { serializeCSS } from '../core'
import { createAntdStylish } from '../stylish/button'
import type { AntdStylish } from '../types'
import { convertStylishToString } from '../utils/convertStylish'
import { useThemeMode } from './useThemeMode'
import { useAntdToken } from './useAntdToken'

export function useAntdStylish(): ComputedRef<AntdStylish> {
  const token = useAntdToken()
  const { appearance, isDarkMode } = useThemeMode()

  return computed(() =>
    convertStylishToString(
      createAntdStylish({
        token: token.value,
        css: serializeCSS,
        appearance: appearance.value,
        isDarkMode: isDarkMode.value,
      }),
    ),
  )
}
